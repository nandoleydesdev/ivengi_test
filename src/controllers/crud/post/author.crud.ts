import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';
import Author from '@/models/author/author.model';
import Book from '@/models/book/book.model';
import IAuthor from '@/models/author/author.interface';
import IBook from '@/models/book/book.interface';
import async from 'async';

let action: string;     // C, R, U, D?

export const authorCreate = (req: Request, res: Response, next: NextFunction) => {

    action = getString('ACTION_AUTHOR_CREATE');

    // Check if Author already exists in database
    Author.findOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, (err: unknown, foundAuthor: IAuthor) => {

        // Check for error
        if (err) return next(err);

        // Author already exists, return error message
        if (foundAuthor) {
            return res.status(400).json({
                action: action,
                message: getString('RESULT_DUPLICATE').replace('%OBJECT%', `${foundAuthor.firstName} ${foundAuthor.lastName}`)
                                                      .replace('%ID%', foundAuthor._id)
            });
        }

        // Create new Author
        const newAuthor = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath
        });

        // Save Author to database
        newAuthor.save((err) => {

            // Check for error
            if (err) return next(err);

            // Success
            res.status(200).json({
                action: action,
                message: getString('SUCCESS'),
                result: newAuthor
            });
        });
    });
}

export const authorRead = (req: Request, res: Response, next: NextFunction) => {

    // Get one specific Author, or an array of all Authors
    let readOne: boolean = undefined !== req.body.id && 0 < req.body.id.length;

    if (readOne) doReadOne(req, res, next);
    else doReadAll(req, res, next);
};

const doReadOne = (req: Request, res: Response, next: NextFunction) => {

    action = getString('ACTION_AUTHOR_READ_ONE');

    // If req.body.id is an invalid ObjectId, return 'not found' message.
    if (!mongoose.isValidObjectId(req.body.id) && notFound(0, 'author', res, action)) return;

    // Async query functions
    async.parallel({
        author(callback) {
            Author.findById(req.body.id)
                    .exec(callback);
        },
        author_books(callback) {
            Book.find({ author: req.body.id }, 'title summary')
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
        let author: IAuthor = results.author as IAuthor;
        author.books = results.author_books as IBook[];

        // Success
        res.status(200).json({
            action: action,
            message: getString('SUCCESS'),
            result: author
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

    action = getString('ACTION_AUTHOR_UPDATE');

    // Find author by id
    Author.findByIdAndUpdate({ _id: req.body.id }, {

        // Update fields with the data in the request body
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath

    }, (err: Error, foundAuthor: IAuthor) => {

        // Check if Author is found, or error
        if (notFound(foundAuthor, 'author', res, action)) return;
        if (err) return next(err);

        // Find author again by id, to get the updated version
        Author.findById(req.body.id, (err: unknown, updatedAuthor: IAuthor ) => {

            if (err) return next(err);

            // Return success message
            res.status(200).json({
                action: action,
                result: getString('SUCCESS'),
                author: updatedAuthor
            });
        });
    });
};

export const authorDelete = (req: Request, res: Response, next: NextFunction) => {

    action = getString('ACTION_AUTHOR_DELETE');

    Author.findByIdAndDelete(req.body.id, (err: Error, foundAuthor: IAuthor) => {

        // Check if Author is found and error
        if (notFound(foundAuthor, 'author', res, action)) return;
        if (err) return next(err);

        // Return success message
        res.status(200).json({
            action: action,
            type: getString('SUCCESS')
        });
    });
};
