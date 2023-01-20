import { Schema, model } from 'mongoose';
import IBook from './book.interface';
import IEdition from './edition.interface';

const EditionSchema = new Schema<IEdition>({
    version: {
        type: Number,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    }
});

const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    editions: [EditionSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
}, {
    toJSON: { virtuals: true }
});

BookSchema.virtual('url').get(function() {
    return `/books/${this._id}`;
});

export default model<IBook>('Book', BookSchema);