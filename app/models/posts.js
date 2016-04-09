// Example model

var mongoose = require('mongoose');

Schema = mongoose.Schema;


var PostSchema = new Schema({

	date:{
		type:'Date',
		default: Date.now
	},

	author:{
		type:'String'
	},

	group:{
		type:'String'
	},

	year:{
		type:'String'
	},

	feed:{
		type:'String'
	},

	text:{
		type:'String'
	}


});


mongoose.model('Post', PostSchema);

