import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Book from '@/models/book/book.model';
import Author from '@/models/author/author.model';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';
import async from 'async';

let action: string;     // C, R, U, D?

export const authorCreate = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        action: 'Author create - GET request',
        result: getString('GET_NOT_IMPLEMENTED')
    });
};

export const authorRead = (req: Request, res: Response, next: NextFunction) => {

    // Get one specific Author, or an array of all Authors
    let readOne: boolean = undefined !== req.params.id && 0 < req.params.id.length;

    if (readOne) doReadOne(req, res, next);
    else doReadAll(req, res, next);
};

const doReadOne = (req: Request, res: Response, next: NextFunction) => {

    action = getString('ACTION_AUTHOR_READ_ONE');

    // If req.body.id is an invalid ObjectId, return 'not found' message.
    if (!mongoose.isValidObjectId(req.params.id) && notFound(0, 'author', res, action)) return;

    // Async query functions
    async.parallel({
        author(callback) {
            Author.findById(req.params.id)
                  .exec(callback);
        },
        author_books(callback) {
            Book.find({ author: req.params.id }, 'title summary')
                .sort({ title: 'ascending' })
                .exec(callback);
        }
    },

    // Callback function, to run when all async query functions are finished
    (err: unknown, results) => {

        // Check for error and Author not found
        if (err) return next(err);
        if (notFound(results.author, 'author', res, action)) return;

        // Add list of books to Author result
        let thisAuthor = JSON.parse(JSON.stringify(results.author));
        thisAuthor.books = results.author_books;

        // Success
        res.status(200).json({
            action: action,
            message: getString('SUCCESS'),
            result: thisAuthor
        });
    });
}

const doReadAll = (req: Request, res: Response, next: NextFunction) => {

    action = getString('ACTION_AUTHOR_READ_ALL');

    Author.find()
          .exec((err: unknown, allAuthors) => {
                let numberOfAuthors: number = Object.values(allAuthors).length;

                // Check for Books are found and error
                if (notFound(numberOfAuthors, 'authors', res, action)) return;
                if (err) return next(err);

                // Success
                res.status(200).json({
                    action: action,
                    message: getString('SUCCESS_RESULTS').replace('%NUMBER%', numberOfAuthors.toString())
                                                         .replace('%OBJECTS%', 'Authors'),
                    result: allAuthors
                });
            });
}

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