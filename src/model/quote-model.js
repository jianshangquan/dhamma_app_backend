import shortid from "shortid";
import RandomQuote from 'random-quotes';

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