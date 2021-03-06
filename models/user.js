var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');
    
var userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    uname: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required:  true}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);