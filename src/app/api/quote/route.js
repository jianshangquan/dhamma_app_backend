


import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = Utils.searchParams(request.url);
    return NextResponse.json({});
}