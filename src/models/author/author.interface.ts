import { Document } from 'mongoose';
import IBook from '@/models/book/book.interface';

interface IAuthor extends Document {
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    dateOfDeath: Date,
    books: Array<IBook>
}

export default IAuthor;