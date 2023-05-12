const fs = require('fs')
const chalk = require('chalk')

const addNote = function(title, body){
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)

    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })
    if(!duplicateNotes){
        
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added!'))
    }
    else{
        console.log(chalk.red.inverse('Note title taken!'))
    }

    
}

const removeNote = (title) => {
    console.log(title)
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // const notesToKeep = notes.filter(function(note){
    //     return note.title !== title
    // })

    if(notesToKeep.length === notes.length)
    {
        console.log(chalk.red.inverse('No note found with title ' + title))
    }
    else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note Removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if(notes.length === 0)
    {
        console.log(chalk.red.inverse('No Notes found!'))
    }
    else{
        console.log(chalk.inverse.bold('Your Notes:'))
        notes.forEach((note) => {
            console.log(note.title)
        })
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteRead = notes.find((noteRead) => noteRead.title === title)

    if(!noteRead)
        console.log(chalk.red.inverse('No notes with title ' + title + ' found!'))

    else
    {
            console.log(chalk.inverse.bold('Title: ' + noteRead.title))
            console.log('Body:' + noteRead.body)
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e) {
        return[]
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}