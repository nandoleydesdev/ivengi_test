const getString = (name: string): string => {

    switch (name) {
        case 'SUCCESS':         return 'Success';
        case 'SUCCESS_RESULTS': return 'Success, found %NUMBER% %OBJECTS%';
        case 'ERROR':           return 'Error';

        case 'RESULT_DUPLICATE':    return '%OBJECT% already exists with id: %ID%';

        case 'RESULT_NO_AUTHOR':    return 'Author not found';
        case 'RESULT_NO_AUTHORS':   return 'No Authors found';
        case 'RESULT_NO_BOOK':      return 'Book not found';
        case 'RESULT_NO_BOOKS':     return 'No Books found';

        case 'ACTION_AUTHOR_CREATE':    return 'Create new Author';
        case 'ACTION_AUTHOR_UPDATE':    return 'Update existing Author';
        case 'ACTION_AUTHOR_READ_ONE':  return 'Get one specific Author';
        case 'ACTION_AUTHOR_READ_ALL':  return 'Get an array of all Authors';
        case 'ACTION_AUTHOR_DELETE':    return 'Delete Author from database';

        case 'ACTION_BOOK_CREATE':    return 'Create new Book';
        case 'ACTION_BOOK_UPDATE':    return 'Update existing Book';
        case 'ACTION_BOOK_READ_ONE':  return 'Get one specific Book';
        case 'ACTION_BOOK_READ_ALL':  return 'Get an array of all Books';
        case 'ACTION_BOOK_DELETE':    return 'Delete Book from database';

        case 'GET_NOT_IMPLEMENTED': return 'NOT YET IMPLEMENTED - this GET request will be used for creating user input form';

        case 'PAGE_INDEX_TITLE':    return 'Books and Authors';

        default: return '';
    }

}

export default getString;