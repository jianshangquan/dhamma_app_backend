


import JsonResponse from '@/model/json-response';
import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import RandomQuote from 'random-quotes';
import shortid from 'shortid';

export async function GET(request, { params }) {

    const rand = RandomQuote();
    const quote = {
        id: shortid(),
        createdDate: new Date(),
        quote: rand.body,
        author: {
            name: rand.author
        }
    }

    return JsonResponse.success({
        data: quote
    }).build()
}

