import { NextResponse } from 'next/server';

const JsonResponse = {
    error({ code, message, detailMessage, details = [] }) {
        const tempData = {
            "succeed": false,
            "status": "fail",
            "code": code,
            "error": {
                "details": details,
                "message": message,
                "detailMessage": detailMessage,
            },
            "payload": {
                "message": '',
                "detailMessage": "",
                "data": {} // your data here !!
            }
        };
        return {
            build: () => NextResponse.json(tempData),
            data: tempData
        }
    },
    success({ code = 200, message = null, detailMessage = null, data = {} }) {
        const tempData = {
            "succeed": true,
            "status": "success",
            "code": code,
            "error": null,
            "payload": {
                "message": message,
                "detailMessage": detailMessage,
                "data": data
            }
        }
        return {
            build: () => NextResponse.json(tempData),
            data: tempData
        }
    }
}

export default JsonResponse;