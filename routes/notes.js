const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend
} = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    console.log(title)
    console.log(text)
    console.log(uuidv4())

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(), // Gives a unique id to each note
        };

        readAndAppend(newNote, './db/db.json');

        console.log("Successfully added new note")

        // Give the index.js the JSON it's been waiting for
        res.json(JSON.stringify(newNote));
    }
    else {
        console.log("Error in posting new note");
    }



});

module.exports = notes;