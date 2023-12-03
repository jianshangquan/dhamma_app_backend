import { DBError } from '@/model/error/error';
import mongoose from 'mongoose';

const MONGODB_URL = process.env.NEXT_MONGODB_URL;

let DB_CONNECTED = false;
export default async function connectDB(){
    
    if(DB_CONNECTED){
        console.log('db already connected', DB_CONNECTED);
        return;
    }
    try{
        console.log('new connection db');
        await mongoose.connect(MONGODB_URL);
        DB_CONNECTED = true;
    }catch(e){
        console.log(e)
        throw new DBError({ msg: 'Unable to connect to database', name: 'Error when connecting database' });
    }
}


