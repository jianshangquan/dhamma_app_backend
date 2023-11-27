


import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-model';
import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import RandomQuote from 'random-quotes';
import shortid from 'shortid';

export async function GET(request, { params }) {

    const quote = new Quote();

    return JsonResponse.success({
        data: quote
    }).build()
}

