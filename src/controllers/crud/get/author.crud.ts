import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '@/models/book/book.model';
import Author from '@/models/author/author.model';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';
import async from 'async';

export const authorCreate = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Author create - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};

export const authorRead = (req: Request, res: Response, next: NextFunction) => {

    let action: string;

    // Get one specific Author, or an array of all Authors
    let readOne: boolean = undefined !== req.params.id && 0 < req.params.id.length,
        readAll: boolean = !readOne;

    // If req.params.id is an invalid ObjectId, create new ObjectId to prevent error. This ObjectId will have no query results.
    let searchId: string | mongoose.Types.ObjectId = readOne && mongoose.isValidObjectId(req.params.id) ? req.params.id : new mongoose.Types.ObjectId();

    // Async query functions
    async.parallel({
        author(callback) {
            Author.findById(searchId)
                  .exec(callback);
        },
        author_books(callback) {
            Book.find({ author: searchId }, 'title summary')
                .sort({ title: 'ascending' })
                .exec(callback);
        },
        authors(callback) {
            Author.find()
                  .exec(callback);
        }
    },

    // Callback function, to run when all async query functions are finished
    (err: unknown, results) => {

        // Check for error
        if (err) return next(err);

        // Get one specific Author
        if (readOne) {

            action = getString('ACTION_AUTHOR_READ_ONE');

            // Check if Author is found
            if (notFound(results.author, 'author', res, action)) return;

            // Add list of books to Author result
            let thisAuthor = JSON.parse(JSON.stringify(results.author));
            thisAuthor.books = results.author_books;

            // Success
            res.status(200).json({
                action: action,
                type: getString('SUCCESS'),
                result: thisAuthor
            });
        }

        // Get an array of all Authors
        else if (readAll) {

            action = getString('ACTION_AUTHOR_READ_ALL');

            let numberOfAuthors: number = !results.authors ? 0 : Object.values(results.authors).length;

            // Check for Books are found and error
            if (notFound(numberOfAuthors, 'authors', res, action)) return;
            if (err) return next(err);

            // Success
            res.status(200).json({
                action: action,
                type: getString('SUCCESS_RESULTS').replace('%NUMBER%', numberOfAuthors.toString())
                                                  .replace('%OBJECTS%', 'Authors'),
                result: results.authors
            });
        }
    });
};

export const authorUpdate = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Author update - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};

export const authorDelete = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Author delete - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};