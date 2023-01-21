import { Schema, model } from 'mongoose';
import IAuthor from './author.interface';
import IBook from '@/models/book/book.interface';

const AuthorSchema = new Schema<IAuthor>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    dateOfDeath: {
        type: Date,
        required: false
    },
    books: [] as IBook[]
}, {
    toJSON: { virtuals: true }
});

AuthorSchema.virtual('url').get(function() {
    return `/authors/${this._id}`;
});

export default model<IAuthor>('Author', AuthorSchema);