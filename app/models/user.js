// Example model

var mongoose = require('mongoose');

Schema = mongoose.Schema;


var UserSchema = new Schema({

	name:{
		type:'String'
	},

	surname:{
		type:'String'
	},

	email:{
		type:'String',
		required: true
	},

	password:{
		type:'String',
		required: true
	},

	number:{
		type:'String'
	},

	year:{
		type:'String'
	},

	group:{
		type:'String'
	},

	admin:{
		type:'Boolean',
		default: false
	}

});


mongoose.model('User', UserSchema);

