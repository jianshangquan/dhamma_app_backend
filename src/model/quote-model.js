import { firestore } from "@/db/firebase"
import Utils from "@/utils/Utils";
import { collection, deleteDoc, doc, endAt, getDoc, getDocs, limit, orderBy, query, setDoc, startAt } from "firebase/firestore"
import shortid from "shortid";
import RandomQuote from 'random-quotes';


const COLLECTION_NAME = 'quotes';

export default function Quote({
    id = shortid(),
    createdDate = new Date(),
    quote,
    author = {
        name: null
    }
} = {}){

    if(!quote && !author.name){
        const rand = RandomQuote();
        quote = rand.body;
        author.name = rand.author;
    }

    return {
        id, 
        createdDate,
        quote,
        author
    }
}











Quote.find = async function ({ skip = 0, limit: lmt = 10 } = {}) {
    const mantraRef = collection(firestore, COLLECTION_NAME);
    const q = query(mantraRef, orderBy('createdDate'), startAt(skip), limit(lmt))
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
            id: doc.id,
            ...d,
        }
    });
    return data;
}


Quote.findById = async function (id) {
    const mantraRef = collection(firestore, COLLECTION_NAME);
    const mantraDoc = doc(mantraRef, id)
    const snapshot = await getDoc(mantraDoc);
    if(snapshot.exists()){
        return snapshot.data()
    }
    throw new Error('Mantra not found');
}



Quote.save = async function (data = new Quote()) {
    const { createdDate, quote, author } = data;
    const mantraCollection = collection(firestore, COLLECTION_NAME);
    const mantraDoc = doc(mantraCollection)
    await setDoc(mantraDoc, { id: mantraDoc.id, createdDate, quote, author })
    return { id: mantraDoc.id, createdDate, quote, author };
}



Quote.updateById = async function (id, { createdDate, quote, author }) {
    const mantraCollection = collection(firestore, COLLECTION_NAME);
    const mantraDoc = doc(mantraCollection, id)
    const updateData = Utils.removeUndefineProperty({ createdDate, quote, author })
    await setDoc(mantraDoc, { id: mantraDoc.id, ...updateData }, { merge: true })
}


Quote.deleteById = async function (id) {
    const mantraDoc = doc(firestore, COLLECTION_NAME, id)
    const response = await deleteDoc(mantraDoc)
    console.log(response);
}
