


import { DBError, DBErrorCode } from '@/model/error/error';
import JsonResponse from '@/model/json-response';
import Quote from '@/model/quote-model';
import Utils from '@/utils/Utils';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';
import RandomQuote from 'random-quotes';
import shortid from 'shortid';

export async function GET(request, { params }) {

    // const quote = await Quote.findById();
    const { id } = params;
    try{
        const quote = await Quote.findById(id);
        return JsonResponse.success({
            data: quote
        }).build()
    }catch(e){
        console.log('e message : ', e);
        if(e instanceof DBError){
            if(e.code == DBErrorCode.DOCUMENT_NOT_FOUND)
                return JsonResponse.error({ message: e.message, code: e.code, httpStatusCode: HttpStatusCode.BadRequest }).build();
        }
        return JsonResponse.error({ message: 'Internal server error occured', httpStatusCode: HttpStatusCode.InternalServerError }).build();
    }
}

export async function DELETE(request, { params }){
    const { id } = params;
    try{
        const del = await Quote.deleteById(id);
        return JsonResponse.success({ 
            message: `Delete document ${id} is succeed`,
            detailMessage: `Delete document ${id} is succeed`
        }).build()
    }catch(e){
        console.log('e message : ', e);
        if(e instanceof DBError){
            if(e.code == DBErrorCode.DOCUMENT_NOT_FOUND)
                return JsonResponse.error({ message: e.message, code: e.code }).build();
        }
        return JsonResponse.error({ message: 'Internal server error occured', code: 500 }).build();
    }
}
