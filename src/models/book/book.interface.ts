import { Document, Schema } from 'mongoose';
import IEdition from './edition.interface';

interface IBook extends Document {
    title: String,
    summary: String,
    ISBN: String, // format: 978-94-92182-71-5 or 978 94 92182 71 5
    // editions: [{
    //     version: Number,
    //     publicationDate: Date
    // }],
    author: Schema.Types.ObjectId
}

export default IBook;

