import UrlPattern from 'url-pattern'


const matcher = new UrlPattern('/api/ghs');


const isValidPath = (patterns, givenPath = '') => {
    let flag = false;

    for (let i = 0; i < patterns.length; i++) {
        const value = patterns[i].match(givenPath);
        if (value) return value;
    }
    return flag;
}

export default function StackMiddleware(req, middlewares = []) {
    return async function (request = req) {
        return new Promise(async (resolve, reject) => {
            let stackIndex = 0;
            const pathName = request.nextUrl.pathname;
            const activatedMiddwares = middlewares.filter(mid => isValidPath(mid.patterns, pathName))
            let executeCompleted = false;

            async function executeStack(mid) {
                const next = async (err) => {
                    if(err) reject(err);

                    stackIndex = stackIndex + 1;
                    if (stackIndex < activatedMiddwares.length) {
                        try{
                            await executeStack(activatedMiddwares[stackIndex])
                        }catch(e) {
                            reject(e)
                        }
                    }else{
                        executeCompleted = true;
                        resolve()
                    }
                }

                const response = await mid.handler(request, next);
                if(response == StackMiddleware.status.Completed){
                    executeCompleted = true;
                    resolve();
                }else if(!executeCompleted){
                    next();
                }
                return response;
            }

            if (activatedMiddwares.length != 0) {
                try{
                    await executeStack(activatedMiddwares[stackIndex]);
                }catch(e){
                    reject(e)
                }
            }
        })
    }
}

StackMiddleware.status = Object.freeze({
    Completed: 'completed'
})

StackMiddleware.end = function () {
    return StackMiddleware.status.Completed;
}





export function Middleware(paths = [], options = { name: '' }, handler) {
    if(options instanceof Function){
        return {
            paths,
            name: null,
            handler: options,
            patterns: paths.map(path => new UrlPattern(path))
        }
    }

    return {
        paths,
        name: options.name,
        handler,
        patterns: paths.map(path => new UrlPattern(path))
    }
}