


import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    // console.log(options);
    const { id } = Utils.searchParams(request.url);
    return NextResponse.json({ name: 'Anuj Singh', id });
}