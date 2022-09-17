const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile
} = require('../helpers/fsUtils');

notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const { title, text } = req.body;

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

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);

            res.json(`Note ID ${noteId} has been deleted`)
        })
});

module.exports = notes;