
import JsonResponse from "@/model/json-response";
import busboy from "busboy";
import fs from 'fs'
import { Readable } from 'node:stream';
import request from "request";
import shortid from "shortid";
import path from "path";
import Utils from "@/utils/Utils";
import isValidPath from "is-valid-path";
import { NextResponse } from 'next/server';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }



function parsePath(path = '', t){
    const p = (path || shortid()).replace(/[.]|[/]|\\/g, '');
    console.log('p', path, t);
    if(p.length == 0) return shortid();
    return p;
}


const FileServer = 'http://localhost:5000'

export async function POST(req, { params }) {
    // const formdata = await req.formData();
    // const files = formdata.getAll('file');

    // files.forEach(async file => {
    //     const path = `/Users/jianshangquan/App Developemnt/Project/Dhamma/dhamma_app_backend/data/${shortid()}.mov`;
    //     const bytes = await file.arrayBuffer();
    //     const buffer = Buffer.from(bytes);
    //     fs.writeFileSync(path, buffer);
    // })



    // fetch(FileServer, {
    //     method: req.method,
    //     headers: {
    //         ...req.headers,
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     body: req.body
    // })



    const files = [];
    const searchParam = Utils.searchParams(req.url);
    const tag = parsePath(searchParam.tag, 'tag');
    const groupId = parsePath(searchParam.groupId);
    await new Promise((resolve, reject) => {
        const bb = busboy({
            headers: {
                ...req.headers,
                'content-type': req.headers.get('Content-type')
            }
        })
        bb.on('file', (name, stream, info) => {
            const id = shortid();
            const ext = path.extname(info.filename);
            const file = `${id}${ext}`;
            const filepath = `/Users/jianshangquan/App Developemnt/Project/Dhamma/dhamma_app_backend/data/public/${tag.length == 0 ? shortid() : tag}-${groupId}`;
            fs.mkdirSync(filepath, { recursive: true })
            const writeStream = fs.createWriteStream(path.resolve(`${filepath}/${file}`));
            files.push({ name, file })
            stream.pipe(writeStream);
        })

        bb.on('close', () => {
            resolve()
        })

        Readable.fromWeb(req.body).pipe(bb);
    })



    return JsonResponse.success({
        data: {
            groupId,
            tag,
            files
        }
    }).build()
} 








