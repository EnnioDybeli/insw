// Example model

var mongoose = require('mongoose');

Schema = mongoose.Schema;


var UserSchema = new Schema({

	name:{
		type:'String',
		required: true
	},

	surname:{
		type:'String',
		required: true
	},

	email:{
		type:'String',
		required: true,
	},

	number:{
		type:'String',
	},

	year:{
		type:'Number',
		required: true,
	},

	group:{
		type:'Number',
		required: true
	},

	admin:{
		type:'Boolean',
		default: false
	}

});


mongoose.model('User', UserSchema);

