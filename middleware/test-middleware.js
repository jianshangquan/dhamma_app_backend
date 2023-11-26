import { Middleware, RequestMethod } from "./stack-middleware-next13";


const TestMiddleware =  Middleware({
    paths: ['/api/*'],
    methods: RequestMethod.any(),
    handler: (request, next) => {
        console.log('test stack middleware');

        next();
    }
});

export default TestMiddleware;