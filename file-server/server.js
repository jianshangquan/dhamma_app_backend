import express from 'express';
import busboy from 'busboy';
import fs from 'fs';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname, './../data/'));

app.use('/**', (req, res, next) => {
    // res.send(req.url);
    next();
})
// app.use(express.static(path.join(__dirname, './../data/public')));


app.get('/file/**', (req, res, next) => {
    const file = decodeURI(req.url).replace('/file/', '');
    return res.sendFile(path.join(__dirname, './../data/public', file), function(err){
        if(err){
            res.status(err.status).end();
        }
    });
    res.send({});
})


// app.post('/', (req, res, next) => {
//     const bb = busboy({ headers: req.headers });

//     bb.on('file', (name, stream, info) => {
//         console.log(info);
//         const path = `/Users/jianshangquan/App Developemnt/Project/Dhamma/dhamma_app_backend/data/${shortid()}.mov`;
//         const writer = fs.createWriteStream(path);
//         stream.pipe(writer)
//     })


//     bb.on('close', async () => {

//         return res.json({
//             status: 'Succeed',
//             message: 'Upload media succeed',
//             payload: {}
//         })
//     })

//     req.pipe(bb)

//     // res.send({succeed: 'true'})
// })


app.listen(5000, (err) => {
    if(err) return console.log('server get error')
    console.log("Server start listen on port 5000")
})