


import express from 'express';
import renderPage from '../../helpers/pageHelper.js';
import BookRepository from '../../repositories/bookRepository.js';

class UxController {
    constructor() {
        this.router = express.Router();
        this.router.get('/home', (request, response) => this.getHome(request, response));
        this.router.get('/catalogue', (request, response) => this.getCatalogue(request, response));
        this.bookRepository = new BookRepository();
    }

    getHome(request, response) {
        var userInfo = {
            user: "unknown",
            name: "Mock User"
        };
        renderPage(request, response, "ux/html/home.html", userInfo);
    }

    async getCatalogue(request, response) {

        const userInfo = {
            user: "unknown",
            name: "Mock User"
        }

        try {
            let books = await this.bookRepository.getAllBooks();
            
            const catalogueData = {
                    userInfo: userInfo,
                    books: books
            };
            renderPage(request, response, "ux/html/catalogue.html", catalogueData);
        } catch (e){
            response.status(500).send("repository error");
        }
    }


    errorResponse(response, error, statusCode) {
        if (!statusCode) {
            statusCode = 500;
        }
        response.status(statusCode).send(error);
    }

}

export default new UxController().router;