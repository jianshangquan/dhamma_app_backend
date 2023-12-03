import { firestore } from "@/db/firebase"
import Utils from "@/utils/Utils";
import { Timestamp, collection, deleteDoc, doc, endAt, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, startAt, where } from "firebase/firestore"
import shortid from "shortid";
import RandomQuote from 'random-quotes';
import { DBError, DBErrorCode } from "./error/error";
import connectDB from "@/db/mongodb";
import QuoteModel from "./mongoose-model/quote-mongo-model";


const COLLECTION_NAME = 'quotes';

export default function Quote({
    id = shortid(),
    createdDate = new Date(),
    quote,
    author = {
        name: null
    }
} = {}) {

    if (!quote && !author.name) {
        const rand = RandomQuote();
        quote = rand.body;
        author.name = rand.author;
    }

    return {
        id,
        createdDate,
        serverTime: new Date(),
        quote,
        author
    }
}











Quote.find = async function ({ skip = 0, limit = 10 } = {}) {
    await connectDB();
    const quotes = await QuoteModel.find().sort({createdDate: -1}).skip(skip).limit(limit);
    return quotes;
}


Quote.findById = async function (id) {
    await connectDB();
    const quote = await QuoteModel.findById(id);
    return quote;
}




Quote.latest = async function () {
    await connectDB();
    const today = new Date();
    const quote = await QuoteModel.findOne({ createdDate: { $lte: today } }).limit(1);
    return quote;
}


Quote.getRandom = async function () {
    await connectDB();
    // const rand = Math.random();
    // console.log('rand', rand);
    // let data = await QuoteModel.findOne({ rand: { $gte: rand } });
    // if(data == null) QuoteModel.findOne({ rand: { $lte: rand } });

    const data = await QuoteModel.aggregate([
        {
            $addFields:  {
                'rnd': { $rand: {} }
            },
        },
        {
            $sort: { 
                'rnd' : 1
            }
        },
        { $limit: 1 },
        { $unset: 'rnd' }
    ]);

    return data[0];
}


Quote.save = async function (data = new Quote()) {
    const { createdDate, quote, author } = data;
    const d = {
        createdDate: new Date(),
        quote,
        author
    };
    return await QuoteModel(d).save();
}



Quote.updateById = async function (id, { createdDate, quote, author }) {
    const updateData = Utils.removeUndefineProperty({ createdDate, quote, author });
    const data = await QuoteModel.findByIdAndUpdate(id, updateData);
    return updateData;
}


Quote.deleteById = async function (id) {
    const data = await QuoteModel.findByIdAndDelete(id);
    return data;
}
