import { NextResponse } from 'next/server';
import StackMiddleware, { Middleware } from '../middleware/stack-middleware-next13';


export async function middleware(request) {
    const stack = StackMiddleware(request, [
        Middleware(['/api/*'],(request, next) => {
            console.log('api stack middleware');
            
            next();
        }),
        Middleware(['/api/*'], (request, next) => {
            console.log('api2 stack middleware');
            
            next();
        }),
        Middleware(['/api/*'], (request, next) => {
            console.log('api3 stack middleware');
            
            next();
        }),
    ]);
    const result = await stack(request);
    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
}