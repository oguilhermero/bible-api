# Bible API
The project is publicly deployed on this Google Cloud App Engine hosted [website](https://high-balancer-452319-n8.rj.r.appspot.com/verse).

## What is it
This project is a learning personal project. It uses a Bootstrap HTML page, an Express.js server to serve webpages and an external Bible reference API. The bible reference API fetches data from [bible-api](https://bible-api.com/) website[^1].

## How it works
Whenever the website loads, JavaScript will fetch the complete Bible book list. When a book is selected, then another function fetches the chapters for the selected book. When the chapter is selected, then another function fetches the verses for that chapter. Finally, when the user clicks the "Get verse" button, the verse text is fetched from the API and both the verse and the reference are printed on the DOM.

## Roadmap
1. Add an option to select the translation
2. Implement a history feature, initially to be kept by the server until it gets idle
3. Implement a user login feature to store the last 5 verses fetched for the user
4. Create an "Add to favorite verse" option for the user
5. Expand the usage to full chapter reading

[^1]: all credits go to Tim Morgan (here are his [Github](https://github.com/seven1m) and [website](https://timmorgan.dev/) pages).