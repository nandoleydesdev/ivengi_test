import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';
import Book from '@/models/book/book.model';
import IBook from '@/models/book/book.interface';

let action: string;     // C, R, U, D?

export const bookCreate = (req: Request, res: Response, next: NextFunction) => {

    action = getString('ACTION_BOOK_CREATE');

    // Check if book already exists in database
    Book.findOne({
            title: req.body.title,
            author: req.body.author
        })
        .populate("author")
        .exec((err: unknown, foundBook) => {

            // Check for error
            if (err) return next(err);

            // Book already exists, return error message
            if (foundBook) {
                return res.status(400).json({
                    action: action,
                    type: getString('ERROR'),
                    result: getString('RESULT_DUPLICATE').replace('%OBJECT%', `"${foundBook.title}"`)
                                                         .replace('%ID%', foundBook._id)
                });
            }

            // Create new Book
            const newBook = new Book({
                title: req.body.title,
                summary: req.body.summary,
                ISBN: req.body.ISBN,
                editions: req.body.editions,
                author: req.body.author
            });

            // Save Book to database
            newBook.save((err) => {

                // Check for error
                if (err) return next(err);

                // Success
                res.status(200).json({
                    action: action,
                    type: getString('SUCCESS'),
                    result: newBook
                });
            });
        });
};

export const bookRead = (req: Request, res: Response, next: NextFunction) => {

    // Get one specific Book, or an array of all Books
    let readOne: boolean = undefined !== req.body.id && 0 < req.body.id.length,
        readAll: boolean = !readOne;

    // If req.body.id is an invalid ObjectId, create new ObjectId to prevent error. This ObjectId will have no query results.
    let searchId: string | mongoose.Types.ObjectId = mongoose.isValidObjectId(req.body.id) ? req.body.id : new mongoose.Types.ObjectId();

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

    action = getString('ACTION_BOOK_UPDATE');

    // Find book by id and update fields
    Book.findByIdAndUpdate({ _id: req.body.id }, {

        // Update fields with the data in the request body
        title: req.body.title,
        summary: req.body.summary,
        ISBN: req.body.ISBN,
        editions: req.body.editions,
        author: req.body.author

    }, (err: Error, foundBook: IBook) => {

        // Check if Book is found, or error
        if (notFound(foundBook, 'book', res, action)) return;
        if (err) return next(err);

        // Find book again by id, to get the updated version
        Book.findById(req.body.id, (err: unknown, updatedBook: IBook ) => {

            // Check for error
            if (err) {
                return next(err);
            }

            // Return success message
            res.status(200).json({
                action: action,
                result: getString('SUCCESS'),
                book: updatedBook
            });
        });
    });
};

export const bookDelete = (req: Request, res: Response, next: NextFunction) => {

    Book.findByIdAndDelete(req.body.id, (err: Error, foundBook: IBook) => {

        action = getString('ACTION_BOOK_DELETE');

        // Check if Book is found and error
        if (notFound(foundBook, 'book', res, action)) return;
        if (err) return next(err);

        // Return success message
        res.status(200).json({
            action: action,
            result: getString('SUCCESS')
        });
    });
};