const express =require("express")
const homeRoutes= require("./routes/homeroutes")
const apiRoutes= require("./routes/api-routes")

const PORT = process.env.PORT || 3001;

const app = express();

const uuid = require('uuid');
const notes = require('./db/db.json');
const path = require('path')
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(apiRoutes)
app.use(homeRoutes)

//get request for notes html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//post requests for notes
app.post('/routes/api/notes', (req, res) => {

    const {title, text} = req.body;
   //create a new note with a unique id
    if (title && text) {
       const newNote = {
           title,
           text,
           id: uuid.v4(),
       };

   //add new notes to notes array
       notes.push(newNote);
   
       fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
           err ? console.error(err) : console.log(`New note has been written to JSON file`)
       );
       const response = {
           status: 'success',
           body: newNote,
        };
        console.log(response);
        res.status(201).json(response)
    } else {
       res.status(500).json('Need note title and note text')
    };
    });

   //delete request for notes
    app.delete("/routes/api/notes/:id", (req, res) => {
       const noteId = req.params.id
       fs.readFile("./db/db.json", "utf-8", (err, data) => {
           if (err) {
               throw err
           }
           const newNotes = JSON.parse(data).filter(note => note.id != noteId)
   
           fs.writeFile("./db/db.json", JSON.stringify(newNotes, null, 4), (err) => {
               if (err) {
                   throw err
               }
   
               fs.readFile("./db/db.json", "utf-8", (err, data) => {
                   err? console.log(err) : res.json(JSON.stringify(data))
               });
           });
       });    
   });
   //get request for public html, wildcard
    app.get('*', (req, res) => 
       res.sendFile(path.join(__dirname, '../public/index.html'))
   );

 app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
 );