const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
console.log(notesPath)

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => console.log(chalk.blue(note.id, note.title)))
}

async function removeNote(id) {
    const notes = await getNotes()
    const updatedNotes = notes.filter(note => +note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
}

async function updateNote(id, title) {
    const notes = await getNotes()
    const index = notes.findIndex(note => +note.id === id)
    notes[index].title = title
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was updated!'))
}

module.exports = {
    addNote, printNotes, removeNote, updateNote
}
