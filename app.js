const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//customizing yargs version
yargs.version('1.1.0')

//add, remove, read, list

//create add comand
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title:	{
			describe: 'Note title',
			demandOption: true,	//makes this field required and set as boolean by default
			type: 'string'		//setting type to string type (optional, because of nothing is provided there will be a bool val)
			},
		body:	{
			describe: 'Note body',
			demandOption: true,	
			type: 'string'		
			}
		},
	handler: function(argv){
		notes.addNote(argv.title, argv.body)
		}
	})

//create remove command
yargs.command({
	command: 'remove',
	describe: 'Removes a note',
	builder: {
		title:{
			describe: 'Title to be removed',
			demandOption: true,
			type: 'string'
		}},
	handler: function(argv){
		notes.removeNote(argv.title)
		}
	})

//lists a note
yargs.command({
	command: 'list',
	describe: 'Lists all notes',
	handler: function(){
		notes.listNotes()	
	}
	})

//reads a note
yargs.command({
	command: 'read',
	describe: 'Reads a note',
	builder: {
		title: {
			describe: 'Title for node to be read',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv){
		notes.readNote(argv.title)
		}
	})
	
//console.log(yargs.argv)
yargs.parse()

