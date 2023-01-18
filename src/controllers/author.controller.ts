import * as crudPost from '@/controllers/crud/post/author.crud';
import * as crudGet from '@/controllers/crud/get/author.crud';

export const post = {
    create : crudPost.authorCreate,
    read   : crudPost.authorRead,
    update : crudPost.authorUpdate,
    delete : crudPost.authorDelete
}

export const get = {
    create : crudGet.authorCreate,
    read   : crudGet.authorRead,
    update : crudGet.authorUpdate,
    delete : crudGet.authorDelete
}