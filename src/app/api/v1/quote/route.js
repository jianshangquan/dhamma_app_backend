


import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-model';
import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import RandomQuote from 'random-quotes';
import shortid from 'shortid';

export async function GET(request, { params }) {

    const { skip, limit } = Utils.searchParams(request.url);

    const data = await Quote.find();
    return JsonResponse.success({
        data:data
    }).build()
}



function generateRandomQuotes(count) {
    const quotes = [];
    for(let i = 0; i < count; i++){
        const quote = new Quote()
        quotes.push(quote)
    }
    return quotes
}