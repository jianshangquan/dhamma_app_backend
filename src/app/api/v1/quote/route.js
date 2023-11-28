


import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-model';
import Utils from '@/utils/Utils';
import { NextResponse } from 'next/server';
import RandomQuote from 'random-quotes';
import shortid from 'shortid';




export const config = {
    api: {
        bodyParser: true,
    },
}


export async function GET(request, { params }) {

    const { skip, limit } = Utils.searchParams(request.url);

    const data = await Quote.find();
    return JsonResponse.success({
        data:data
    }).build()
}



export async function POST(request, { params }){
    const json = await request.json();
    const quote = new Quote(json);
    const result = await Quote.save(quote);
    return JsonResponse.success({ data: result }).build();
}



function generateRandomQuotes(count) {
    const quotes = [];
    for(let i = 0; i < count; i++){
        const quote = new Quote()
        quotes.push(quote)
    }
    return quotes
}