import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import getString from '@/utils/strings';
import notFound from '@/utils/notfound';
import Author from '@/models/author/author.model';
import Book from '@/models/book/book.model';
import IAuthor from '@/models/author/author.interface';
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
                type: getString('ERROR'),
                result: getString('RESULT_DUPLICATE').replace('%OBJECT%', `${foundAuthor.firstName} ${foundAuthor.lastName}`)
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
                type: getString('SUCCESS'),
                result: newAuthor
            });
        });
    });
}

export const authorRead = (req: Request, res: Response, next: NextFunction) => {

    // Get one specific Author, or an array of all Authors
    let readOne: boolean = undefined !== req.body.id && 0 < req.body.id.length,
        readAll: boolean = !readOne;

    // If req.body.id is an invalid ObjectId, create new ObjectId to prevent error. This ObjectId will have no query results.
    let searchId: string | mongoose.Types.ObjectId = mongoose.isValidObjectId(req.body.id) ? req.body.id : new mongoose.Types.ObjectId();

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
