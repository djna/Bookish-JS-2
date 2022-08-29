
import fsp from 'fs.promises';
import express from 'express';
import Mustache from'mustache';

class UxController {
    constructor() {
        this.router = express.Router();
        this.router.get('/home', (request, response) => this.getHome(request, response));
        this.router.get('/catalogue', (request, response) => this.getCatalogue(request, response));
    }

    getHome(request, response) {
        var userInfo = {
            user: "unknown",
            name: "Mock User"
        };
        this.renderPage(request, response, "ux/html/home.html", userInfo);
    }

    getCatalogue(request, response) {
        var data = {
            userInfo : {
                user: "unknown",
                name: "Mock User"
            },
            books: [
                { "author": "Richard Thompson", "title" : "Beeswing"},
                { "author": "P.G.Bell", "title" : "The Train to Impossible Places"},
                { "author": "Georgina Haydn", "title" : "Taverna"}
            ]
        }
        this.renderPage(request, response, "ux/html/catalogue.html", data);
    }

    renderPage(request, response, page, data) {
        fsp.readFile(page, 'utf8').then(
            (pageTemplate) => {
                let pageHtml = Mustache.render(pageTemplate, data);
                response.status(200).send(pageHtml);
            }
        ).catch((e) => this.errorResponse(response, e));
    }

    errorResponse(response, error, statusCode){
        if ( ! statusCode ){
            statusCode = 500;
        }
        response.status(statusCode).send(error);
}

}

export default new UxController().router;