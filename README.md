# ivengi_test
Create, read, update and delete Books and Authors with this basic REST API.

===================
# POST create Book
url: /books/create  
body:  
{  
   "title": "Book title",  
   "summary": "Book summary",  
   "ISBN": "Book ISBN number",  
   "editions": [  
      {  
         version: 1,  
         publicationDate: "2023-01-18T00:00:00.000Z"  
      }  
   ],  
   "author": "63c53e26ab0a0541335797e9"  
}  

=====================
# POST read one Book
url: /books  
body:  
{  
    "id": "63c7f1d001126c76d8f3dee1", // String (Book ObjectId)  
}  

=====================
# POST read all Books
url: /books
body:

===================
# POST update Book
url: /books/update
body:  
{  
   "id": "63c7f1d001126c76d8f3dee1", // String (Book ObjectId)  
  
   // all fields below are optional  
   "title": "Book title",        // String  
   "summary": "Book summary",    // String  
   "ISBN": "Book ISBN number",   // String  
   "editions": [  
      {  
         version: 1,                                 // Number  
         publicationDate: "2023-01-18T00:00:00.000Z" // Date  
      }  
   ],  
   "author": "63c53e26ab0a0541335797e9", // String (Author ObjectId)  
}

==================
# POST delete Book
url: /books/delete  
body:  
{  
   "id": "63c7f1d001126c76d8f3dee1", // String (Book ObjectId)  
}  


===================
# GET create Book
url: /books/create // Not yet implemented

===================
# GET read one Book
url: /books/(ObjectId)

====================
# GET read all Books
url: /books

===================
# GET update Book
url: /books/(ObjectId)/update // Not yet implemented

===================
# GET delete Book
url: /books/(ObjectId)/delete // Not yet implemented



===================
# POST create Author
url: /authors/create  
body:  
{  
   "firstName": "Author first name",           // String  
   "lastName": "Author first name",            // String  
   "dateOfBirth": "1932-01-18T00:00:00.000Z",  // Date  
   "dateOfBirth": "1998-01-18T00:00:00.000Z"   // Date  
}  

=====================
# POST read one Author
url: /authors  
body:  
{  
   "id": "63c53e26ab0a0541335797e9", // String (Book ObjectId)  
}  

=====================
# POST read all Author
url: /authors  
body:  

===================
# POST update Author
url: /authors/update  
body:  
{  
   "id": "63c53e26ab0a0541335797e9", // String (Book ObjectId)  
  
   // all fields below are optional  
   "firstName": "Author first name",           // String  
   "lastName": "Author first name",            // String  
   "dateOfBirth": "1932-01-18T00:00:00.000Z",  // Date  
   "dateOfBirth": "1998-01-18T00:00:00.000Z"   // Date  
}

==================
# POST delete Author
url: /authors/delete  
body:  
{  
    "id": "63c53e26ab0a0541335797e9", // String (Book ObjectId)  
}  


===================
# GET create Author
url: /authors/create // Not yet implemented

===================
# GET read one Author
url: /authors/(ObjectId)

====================
# GET read all Author
url: /authors

===================
# GET update Author
url: /authors/(ObjectId)/update // Not yet implemented

===================
# GET delete Author
url: /authors/(ObjectId)/delete // Not yet implemented
