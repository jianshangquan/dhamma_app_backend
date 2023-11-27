


import Utils from '@/utils/Utils';
import RandomQuote from 'random-quotes';
import { NextResponse } from 'next/server';
import JsonResponse from '@/model/json-response';

export async function GET(request, { params }) {

    const rand = RandomQuote();
    const quote = {
        createdDate: new Date(),
        quote: rand.body,
        author: {
            name: rand.author
        }
    }

    return JsonResponse.success({ data: quote }).build();
}

