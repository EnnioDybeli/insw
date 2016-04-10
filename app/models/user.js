// Example model

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
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

	verificationToken:{
		type:'String'
	},

	authenticated:{
		type:'Boolean',
		default:false
	},

	admin:{
		type:'Boolean',
		default: false
	}

});



UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


mongoose.model('User', UserSchema);

