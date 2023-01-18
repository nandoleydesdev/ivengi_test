import * as crudPost from '@/controllers/crud/post/book.crud';
import * as crudGet from '@/controllers/crud/get/book.crud';

export const post = {
    create : crudPost.bookCreate,
    read   : crudPost.bookRead,
    update : crudPost.bookUpdate,
    delete : crudPost.bookDelete
}

export const get = {
    create : crudGet.bookCreate,
    read   : crudGet.bookRead,
    update : crudGet.bookUpdate,
    delete : crudGet.bookDelete
}