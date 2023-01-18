import { Response } from 'express';
import getString from '@/utils/strings';

const notFound = (found: any, str: string, res: Response, action: string): Boolean => {
    let notFound: Boolean = false,
        noResult: Boolean = null === found,
        noResults: Boolean = Number.isInteger(found) && 0 === found;

    if (noResult || noResults) {
        res.status(404).json({
            action: action,
            message: getString(`RESULT_NO_${str.toUpperCase()}`)
        });

        notFound = true;
    }

    return notFound;
};

export default notFound;