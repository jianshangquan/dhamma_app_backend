import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

const JsonResponse = {
    error({ code, httpStatusCode = HttpStatusCode.InternalServerError, message, detailMessage, details = [] }) {
        const tempData = {
            "success": false,
            "status": "fail",
            "code": code,
            httpStatusCode,
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
            build: () => NextResponse.json(tempData, { status: httpStatusCode }),
            data: tempData
        }
    },
    success({ code, httpStatusCode = HttpStatusCode.Ok, message = null, detailMessage = null, data = {} } = {}) {
        const tempData = {
            "success": true,
            "status": "success",
            "code": code,
            httpStatusCode,
            "error": null,
            "payload": {
                "message": message,
                "detailMessage": detailMessage,
                "data": data
            }
        }
        return {
            build: () => NextResponse.json(tempData, { status: httpStatusCode }),
            data: tempData
        }
    }
}

export default JsonResponse;