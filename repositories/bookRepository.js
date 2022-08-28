import executeSql from '../helpers/dbHelper.js';
import Book from '../models/book.js';
import e from 'express';

export default class BookRepository {
    async getAllBooks() {

        try {

            const result = await executeSql('SELECT * FROM books');

            let books = result.recordsets[0];
            return books.map(book => {
                return new Book(book.id, book.title, book.author, book.isbn);
            });
        } catch (e) {
            console.log("db error ", e);
            throw "System Repository Error, please try later";
        }
    }

    async getBook(id) {
        try {
            let result = await executeSql(
                'SELECT * FROM books WHERE id = @bookid',
                { 'bookid': id }
            );

            let books = result.recordsets[0];
            books.map(book => {
                return new Book(book.id, book.title, book.author, book.isbn);
            });
            if ( books.length == 0){
                return null;
            } else {
                if (books.length > 1 ){
                    console.log ("Unexpectedly many books", id);
                }
                return books[0];
            }
        } catch (e) {
            console.log("db error ", e);
            throw "System Repository Error, please try later";
        }
    }

    // inserts book record, db generates id
    // return that generated id
    async addBook(book) {
        try {
           let result = await executeSql('INSERT INTO books(title, author, isbn) '
                                + 'OUTPUT INSERTED.id VALUES(@title, @author, @isbn)',
                             { 'title': book.title, 'author': book.author, 'isbn': book.isbn}
                             );
            
            console.log("inserted: " + JSON.stringify(result) );
            let insertOutputRows = result.recordsets[0];
            if ( insertOutputRows.length < 1) {
                throw "System Repository Insertion Error";
            }
                     
            return insertOutputRows[0].id;
            
            
        } catch (e) {
            console.log("add, db error ", e);
            throw "System Repository Error, please try later";
        }
    }

}
