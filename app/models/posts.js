// Example model

var mongoose = require('mongoose');
		Schema   = mongoose.Schema;

var PostSchema = new Schema({

	date:{
		type:'Date',
		default: Date.now
	},

	author:{
		type:'String'
	},

	title:{
		type:'String'
	},

	service:{
		type:'String'
	},

	text:{
		type:'String'
	},

	feed:{
		type:'String'
	},

	grupi:{
		type:'String'
	},

	viti:{
		type:'String'
	},

	authorType:{
		type:'String',
		default:'student'
	}

});


mongoose.model('Post', PostSchema);
