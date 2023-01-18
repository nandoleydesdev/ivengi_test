import { Document, Schema } from 'mongoose';

interface IAuthor extends Document {
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    dateOfDeath: Date
}

export default IAuthor;