const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const socialsSchema = new Schema({
    facebook: String,
    twitter: String,
    github: String
})

const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    firstName: { 
        type: String,
        required: true
    },
    lastName: { 
        type: String
    },
    contactNumber: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: false
    },
    socials: {
        type: socialsSchema
    }
})


// CONTACT VALIDATION
function validatorNum(val) {
    const stringNum = val.toString();
    console.log(val.length);
    return stringNum.length > 5 && stringNum.length < 13;
}

function validatorEmail(val) {
    if(val.length > 0) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
            return true;
          } else {
            return false;
          }
    } 
    return true;
}

contactSchema.path("contactNumber").validate({
    validator: validatorNum,
    message: function(props) {
        return `${props.path} must have at least 6 numbers and ${props.path} must have maximum of 12 numbers, got ${props.value}`;
    }
})

contactSchema.path("email").validate({
    validator: validatorEmail,
    message: function(props) {
        return "Email you have entered is not valid. Please enter a valid email.";
    }
})

// SOCIALS VALIDATION
function validatorFacebook(val) {
    if(val.length > 0) {
        const facebookUrl = "https://www.facebook.com/";
        if(val.length < facebookUrl.length) {
            return false;
        } else {
            const extractValueToMatchFacebookUrl = val.slice(0, facebookUrl.length);
            if(extractValueToMatchFacebookUrl !== facebookUrl) {
                return false;
            } else {
                return true;
            }
        }
    }

    // Pass is nothing is passed
    return true;
}

function validatorTwitter(val) {
    if(val.length > 0) {
        const twitterUrl = "https://twitter.com/";
        if(val.length < twitterUrl.length) {
            return false;
        } else {
            const extractValueToMatchTwitterUrl = val.slice(0, twitterUrl.length);
            if(extractValueToMatchTwitterUrl !== twitterUrl) {
                return false;
            } else {
                return true;
            }
        }
    } 

    // Pass is nothing is passed
    return true;
}

function validatorGithub(val) {
    if(val.length > 0) {
        const githubUrl = "https://github.com/";
        if(val.length < githubUrl.length) {
            return false;
        } else {
            const extractValueToMatchGithubUrl = val.slice(0, githubUrl.length);
            if(extractValueToMatchGithubUrl !== githubUrl) {
                return false;
            } else {
                return true;
            }
        }
    } 

    // Pass is nothing is passed
    return true;
}


socialsSchema.path("facebook").validate({
    validator: validatorFacebook,
    message: function(props) {
        return `Facebook URL is invalid! Facebook URL must start with 'https://www.facebook.com/'`;
    }
})

socialsSchema.path("twitter").validate({
    validator: validatorTwitter,
    message: function(props) {
        return `Twitter URL is invalid! Twitter URL must start with 'https://twitter.com/'`;
    }
})

socialsSchema.path("github").validate({
    validator: validatorGithub,
    message: function(props) {
        return `Github URL is invalid! Github URL must start with 'https://github.com/'`;
    }
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;