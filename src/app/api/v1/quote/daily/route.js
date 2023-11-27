


import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-model';

export async function GET(request, { params }) {

    const quote = new Quote();

    return JsonResponse.success({ data: quote }).build();
}

