import getDbPool from '../helpers/dbHelper.js';
import Book from '../models/book.js';
import e from 'express';

export default class BookRepository  {
    async getAllBooks() {
        
        try {
            const pool = await getDbPool();
            const result = await pool.request().query('SELECT * FROM books') 
                  
            let books = result.recordsets[0];
            return books.map(book => {
                return new Book(book.id, book.title, book.author, book.isbn);
            });
        } catch( e) {
            console.log("db error ", e);
            throw "System Repository Error, please try later";
        }      
    }

}
