import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '@/models/book/book.model';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';

export const bookCreate = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Book create - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};

export const bookRead = (req: Request, res: Response, next: NextFunction) => {

    let action: string;

    // Get one specific Book, or an array of all Books
    let readOne: boolean = undefined !== req.params.id && 0 < req.params.id.length,
        readAll: boolean = !readOne;

    // If req.params.id is an invalid ObjectId, create new ObjectId to prevent error. This ObjectId will have no query results.
    let searchId: string | mongoose.Types.ObjectId = readOne && mongoose.isValidObjectId(req.params.id) ? req.params.id : new mongoose.Types.ObjectId();

    // Get one specific Book
    if (readOne)
    {
        action = getString('ACTION_BOOK_READ_ONE');

        Book.findById(searchId)
            .populate('author')
            .exec((err: unknown, foundBook) => {

            // Check for Book is found and error
            if (notFound(foundBook, 'book', res, action)) return;
            if (err) return next(err);

            // Return success message
            res.status(200).json({
                action: action,
                result: getString('SUCCESS'),
                book: foundBook
            });
        });
    }

    // Get an array of all Books
    else if (readAll) {
        action = getString('ACTION_BOOK_READ_ALL');

        Book.find()
            .populate('author')
            .exec((err: unknown, allBooks) => {

                let numberOfBooks: number = Object.values(allBooks).length;

                // Check for Books are found and error
                if (notFound(numberOfBooks, 'books', res, action)) return;
                if (err) return next(err);

                // Success
                res.status(200).json({
                    action: action,
                    type: getString('SUCCESS_RESULTS').replace('%NUMBER%', numberOfBooks.toString())
                                                      .replace('%OBJECTS%', 'Books'),
                    result: allBooks
                });
            });
    }

};

export const bookUpdate = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Book update - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};

export const bookDelete = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Book delete - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};