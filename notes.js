const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
	const notes = loadNotes()
	console.log(notes)
	const duplicateNote = notes.find((note)=> note.title === title)
	debugger
	if (!duplicateNote){
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green.inverse('Note added'))
	} else{
		console.log(chalk.red.inverse(('Title already exists')))
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const filterArray = notes.filter((note) => note.title !== title)
	console.log(filterArray)
	if (filterArray.length === notes.length) console.log('Note not found')
	else{
		saveNotes(filterArray)
		console.log(chalk.green.inverse('Note removed'))
	}
}

const listNotes = () => {
	const notes = loadNotes()
	console.log(chalk.bgYellow(chalk.red('Your Notes\n')))
	notes.forEach( (note) => console.log(chalk.bgGreen.inverse.bold(note.title)))
}

const readNote = (title) => {
	const notes = loadNotes()
	const note = notes.find((note) => note.title === title)
	if (!note) console.log(chalk.red.inverse.bold('No Note Found with the given tite'))
	else {
		console.log(chalk.yellow.inverse.bold(note.title))
		console.log(note.body)
	}
}

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
	try{
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	}catch (e){
		return []
	}	
}

module.exports = {
		addNote: addNote,
		removeNote: removeNote,
		listNotes: listNotes,
		readNote: readNote
}
