## Installation

1. clone repo
```
$ git clone https://github.com/codebudy5247/BD-assignment.git
$ cd Bd-assignment
```
2. create `.env` file in root Dir
3. Add following data:
```
NODE_ENV=developement
PORT=1337
ORIGIN=http://localhost:3000
DB_URL=Your db url

```
4. install node modules
```
$ npm install
```
5. start server
```
$ npm run dev
```
6. server will start on port define in `.env`.

## API endpoints

Base URL: http://localhost:1337

| APIs | VERB | Parameters | Description |
| --- | --- | --- | --- |
| /api/book | POST | (title, author, summary) | Create a new book. |
| /api/book | GET | none | Get all books. |
| /api/book/:bookId | GET | (bookId) | GEt book details by ID. |
| /api/book/:bookId | PATCH / DELETE | (title, author, summary) | Update or delete book |
