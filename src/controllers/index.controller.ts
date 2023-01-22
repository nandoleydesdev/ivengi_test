import { Request, Response, NextFunction } from 'express';
import getString from '@/utils/strings';

const IndexController = {

    index: (req: Request, res: Response, next: NextFunction) => {
        res.render('pages/index', {
            title: getString('PAGE_INDEX_TITLE')
        });
    }

}

export default IndexController;