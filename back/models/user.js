const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Contact"
        }
    ]
})

const validatorUsername = val => {
    return val.length > 3;
}

// const validatorPassword = val => {
//     return val.length > 5;
// }

userSchema.path("username").validate({
    validator: validatorUsername,
    message: function(props) {
        return "Username must have at least 4 characters.";
    }
});

// userSchema.path("password").validate({
//     validator: validatorPassword,
//     message: function(props) {
//         return "Password must have at least 6 characters.";
//     }
// })

const User = mongoose.model("User", userSchema);

module.exports = User;