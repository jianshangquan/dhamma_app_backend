import { NextResponse } from 'next/server';
import StackMiddleware, { Middleware, withMiddleware } from '../middleware/stack-middleware-next13';
import TestMiddleware from '../middleware/test-middleware';







StackMiddleware.register(TestMiddleware);




export async function middleware(request) {
    return withMiddleware(request)
}


export const config = {
    matcher: ['/:path*'],
}