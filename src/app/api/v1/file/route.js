
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
import mime from 'mime-types';
import Media from "@/utils/Media";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }


const APP_DATA = process.env.NEXT_APP_DIR;


function parsePath(path = '', t){
    const p = (path || shortid()).replace(/[.]|[/]|\\/g, '');
    // console.log('p', path, t);
    if(p.length == 0) return shortid();
    return p;
}


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



    const searchParam = Utils.searchParams(req.url);
    const tag = parsePath(searchParam.tag, 'tag');
    const groupId = parsePath(searchParam.groupId);
    console.log('content', req.headers.get('Content-type') || req.headers.get('Content-Type'))
    const folderpath = `${APP_DATA}/public/${tag.length == 0 ? shortid() : tag}-${groupId}`;

    const files = await new Promise((resolve, reject) => {
        let files = [];
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
            const filepath = `${folderpath}/${file}`;
            fs.mkdirSync(folderpath, { recursive: true })
            const writeStream = fs.createWriteStream(path.resolve(`${filepath}`));
            stream.pipe(writeStream);
            stream.on('close', async () => {
                files.push({ 
                    name,
                    file,
                    info
                })
            })
        })

        bb.on('close', async () => {
            for(let i = 0; i < files.length; i ++){
                const file = files[i];
                const filepath = `${folderpath}/${file.file}`;
                const duration = await Media.getDurationFromMimeType(filepath, file.info.mimeType);
                files[i].duration = duration;
            }
            resolve(files);
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





