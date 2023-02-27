import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '@/models/book/book.model';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';

let action: string;     // C, R, U, D?

export const bookCreate = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Book create - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};

export const bookRead = (req: Request, res: Response, next: NextFunction) => {

    // Get one specific Book, or an array of all Books
    let readOne: boolean = undefined !== req.params.id && 0 < req.params.id.length;

    if (readOne) doReadOne(req, res, next);
    else doReadAll(req, res, next);
};

const doReadOne = (req: Request, res: Response, next: NextFunction, doRender: boolean = false) => {

    action = getString('ACTION_BOOK_READ_ONE');

    // If req.body.id is an invalid ObjectId, return 'not found' message.
    if (!mongoose.isValidObjectId(req.params.id) && notFound(0, 'book', res, action)) return;

    Book.findById(req.params.id)
        .populate('author')
        .exec((err: unknown, foundBook) => {

        // Check for Book is found and error
        if (notFound(foundBook, 'book', res, action)) return;
        if (err) return next(err);

        if (doRender) {
            // Return success message json
            res.status(200).json({
                action: action,
                result: getString('SUCCESS'),
                book: foundBook
            });
        }
        else {
            // Render book page
            res.status(200).render('pages/index', {
                title: 'It works',
                book: foundBook
            });
        }
    });
}

const doReadAll = (req: Request, res: Response, next: NextFunction) => {

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
                message: getString('SUCCESS_RESULTS').replace('%NUMBER%', numberOfBooks.toString())
                                                  .replace('%OBJECTS%', 'Books'),
                result: allBooks
            });
        });
}

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