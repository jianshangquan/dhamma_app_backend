import UrlPattern from 'url-pattern'
import shortid from 'shortid';
import { NextResponse } from 'next/server';


const matcher = new UrlPattern('/api/ghs');
const GLOBAL_REGISTERED_MIDDLEWARE = [];


const isValidPath = (patterns, givenPath = '') => {
    let flag = false;

    for (let i = 0; i < patterns.length; i++) {
        const value = patterns[i].match(givenPath);
        if (value) return value;
    }
    return flag;
}












export async function withMiddleware(request, middlewares = []){
    const stack = StackMiddleware(request, [...GLOBAL_REGISTERED_MIDDLEWARE, ...middlewares]);
    try{
        const result = await stack(request);
        if(result && result.status == StackMiddleware.status.NextResponse){
            return result.nextResponse;
        }
        return NextResponse.next();
    }catch(e){
        console.log('global mid', e)
        return NextResponse.next();
    }
}










export default function StackMiddleware(req, middlewares = []) {
    return async function (request = req) {
        return new Promise(async (resolve, reject) => {
            let stackIndex = 0;
            const pathName = request.nextUrl.pathname;
            const activatedMiddwares = middlewares.filter(mid => {
                const matchMethod = mid.methods.includes(req.method);
                return isValidPath(mid.patterns, pathName) && matchMethod;
            })

            if (activatedMiddwares.length == 0) return resolve();

            let executeCompleted = false;
            let errorOccured = false;
            const completedExecutedStack = [];

            async function executeStack(mid) {

                if (completedExecutedStack.includes(mid.id)) {
                    return reject('Calling stack more then one time it not allowed')
                }

                completedExecutedStack.push(mid.id);
                const curIndex = stackIndex;
                const next = async (err) => {
                    if (err || errorOccured) reject(err);

                    stackIndex = stackIndex + 1;

                    if (stackIndex < activatedMiddwares.length && !executeCompleted) {
                        const nextMid = activatedMiddwares[stackIndex];
                        if (completedExecutedStack.includes(nextMid.id)) {
                            return reject('Calling stack more then one time it not allowed')
                        }
                        try {
                            const response = await executeStack(nextMid)
                        } catch (e) {
                            errorOccured = true;
                            return reject(e)
                        }
                    } else {
                        executeCompleted = true;
                        resolve({ status: StackMiddleware.status.Completed, data: null })
                    }
                    return err ? StackMiddleware.error(err) : StackMiddleware.next()
                }



                const response = await mid.handler(request, next);
                if(response){
                    if (response.status == StackMiddleware.status.Completed || 
                        response.status == StackMiddleware.status.NextResponse) {
                        executeCompleted = true;
                        resolve(response);
                    } else if (response.status == StackMiddleware.status.Error) {
                        errorOccured = true;
                        reject(response.error)
                    } 
                } else if ((response == undefined || response.status == StackMiddleware.status.Next) && !executeCompleted) {
                    next();
                }  
                return response;
            }

            if (activatedMiddwares.length != 0) {
                try {
                    await executeStack(activatedMiddwares[stackIndex]);
                } catch (e) {
                    reject(e)
                }
            }
        })
    }
}

StackMiddleware.status = Object.freeze({
    NextResponse: 'next-response',
    Completed: 'completed',
    Error: 'error',
    Next: 'next'
})






StackMiddleware.register = (middlewares = []) => {
    const isArr = Array.isArray(middlewares)
    if(isArr)
        middlewares.forEach(mid => GLOBAL_REGISTERED_MIDDLEWARE.push(mid))
    else 
        GLOBAL_REGISTERED_MIDDLEWARE.push(middlewares)
    return middlewares;
}








StackMiddleware.NextResponse = function (nextResponse, error){
    return {
        status: StackMiddleware.status.NextResponse,
        data: null,
        nextResponse,
        error
    }
}


StackMiddleware.next = function (data, error) {
    return {
        status: StackMiddleware.status.Next,
        data,
        error,
    };
}

StackMiddleware.end = function (data, error) {
    return {
        status: StackMiddleware.status.Completed,
        data,
        error
    };
}

StackMiddleware.error = function (error) {
    return {
        status: StackMiddleware.status.Error,
        error
    };
}
















export function Middleware({paths = [], id = shortid(), name, handler, methods = RequestMethod.ALL}) {
    return {
        id,
        paths,
        name,
        methods,
        handler,
        patterns: paths.map(path => new UrlPattern(path))
    }
}

export const RequestMethod = {
    GET: ['GET'],
    PUT: ['PUT'],
    POST: ['POST'],
    DELETE: ['DELETE'],
    PATCH: ['PATCH'],
    CONNECT: ['CONNECT'],
    OPTIONS: ['OPTIONS'],
    TRACE: ['TRACE'],
    HEAD: ['HEAD'],
    ALL: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'CONNECT', 'OPTIONS','TRACE', 'HEAD'],
    any: (...methods) => methods
}
