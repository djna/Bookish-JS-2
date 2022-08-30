

import Mustache from 'mustache';
import fsp from 'fs.promises';

function renderPage(request, response, page, data) {
    fsp.readFile(page, 'utf8').then(
        (pageTemplate) => {
            let pageHtml = Mustache.render(pageTemplate, data);
            response.status(200).send(pageHtml);
        }
    ).catch((e) => response.status(500).send(e));
}

export default renderPage;