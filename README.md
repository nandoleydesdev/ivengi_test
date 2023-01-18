# ivengi_test
Create, read, update and delete Books and Authors with this basic REST API.

===================
# POST create Book
url: /books/create  
body:  
{  
&nbsp;&nbsp;&nbsp;"title": "Book title", // String  
&nbsp;&nbsp;&nbsp;"summary": "Book summary",  // String  
&nbsp;&nbsp;&nbsp;"ISBN": "Book ISBN number", // String   
&nbsp;&nbsp;&nbsp;"editions": [  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version: 1,  // Number  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;publicationDate: "2023-01-18T00:00:00.000Z"  // Date  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;&nbsp;],  
&nbsp;&nbsp;"author": "63c53e26ab0a0541335797e9"  // String (ObjectId)  
}  

=====================
# POST read one Book
url: /books  
body:  
{  
&nbsp;&nbsp;&nbsp;"id": "63c7f1d001126c76d8f3dee1", // String (Book ObjectId)  
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
&nbsp;&nbsp;&nbsp;"id": "63c7f1d001126c76d8f3dee1", // String (Book ObjectId)  
  
&nbsp;&nbsp;&nbsp;// all fields below are optional  
&nbsp;&nbsp;&nbsp;"title": "Book title",        // String  
&nbsp;&nbsp;&nbsp;"summary": "Book summary",    // String  
&nbsp;&nbsp;&nbsp;"ISBN": "Book ISBN number",   // String  
&nbsp;&nbsp;&nbsp;"editions": [  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version: 1,                                 // Number  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;publicationDate: "2023-01-18T00:00:00.000Z" // Date  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}  
&nbsp;&nbsp;&nbsp;],  
&nbsp;&nbsp;&nbsp;"author": "63c53e26ab0a0541335797e9", // String (Author ObjectId)  
}

==================
# POST delete Book
url: /books/delete  
body:  
{  
&nbsp;&nbsp;&nbsp;"id": "63c7f1d001126c76d8f3dee1", // String (Book ObjectId)  
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
&nbsp;&nbsp;&nbsp;"firstName": "Author first name",           // String  
&nbsp;&nbsp;&nbsp;"lastName": "Author first name",            // String  
&nbsp;&nbsp;&nbsp;"dateOfBirth": "1932-01-18T00:00:00.000Z",  // Date  
&nbsp;&nbsp;&nbsp;"dateOfBirth": "1998-01-18T00:00:00.000Z"   // Date  
}  

=====================
# POST read one Author
url: /authors  
body:  
{  
&nbsp;&nbsp;&nbsp;"id": "63c53e26ab0a0541335797e9", // String (Book ObjectId)  
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
&nbsp;&nbsp;&nbsp;"id": "63c53e26ab0a0541335797e9", // String (Book ObjectId)  
  
&nbsp;&nbsp;&nbsp;// all fields below are optional  
&nbsp;&nbsp;&nbsp;"firstName": "Author first name", // String  
&nbsp;&nbsp;&nbsp;"lastName": "Author first name", // String  
&nbsp;&nbsp;&nbsp;"dateOfBirth": "1932-01-18T00:00:00.000Z", // Date  
&nbsp;&nbsp;&nbsp;"dateOfBirth": "1998-01-18T00:00:00.000Z" // Date  
}

==================
# POST delete Author
url: /authors/delete  
body:  
{  
&nbsp;&nbsp;&nbsp;"id": "63c53e26ab0a0541335797e9", // String (Book ObjectId)  
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
