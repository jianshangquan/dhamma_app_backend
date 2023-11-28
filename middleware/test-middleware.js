import { Middleware, RequestMethod } from "./stack-middleware-next13";


const TestMiddleware =  Middleware({
    paths: ['/api/v1/*'],
    methods: RequestMethod.ALL,
    handler: (request, next) => {
        console.log('test stack middleware');

        next();
    }
});

export default TestMiddleware;