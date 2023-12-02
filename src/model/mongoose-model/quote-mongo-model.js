import mongoose from 'mongoose';



const AuthorSchema = new mongoose.Schema({
    name: String
}, { _id: false })



const QuoteSchema = new mongoose.Schema({
    createdDate: { type: Date, default: () => new Date() },
    serverTime: { type: Date, default: () => new Date() },
    rand: { type: Number, default: () => Math.random() },
    quote: String,
    author: AuthorSchema
})


const QuoteModel = mongoose.models.quote || new mongoose.model('quote', QuoteSchema);
export default QuoteModel;