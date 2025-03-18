const user = require("../db/models/user");
const jwt = require('jsonwebtoken'); //import the json web token

const generateToken = (payload) => { //generates a jwt token, payload is the users data inside the token
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{ //a key used to verify the token,currently in the .env file
        expiresIn:process.env.JWT_EXPIRES_IN //sets expiry time for token, also in the .env file
    });

};


const signup = async (req, res,next) => {
    const body = req.body;

    if (!['1','2'].includes(body.userType)){ //since we only want user 1 and 2 to signup
        return res.status(400).json({ //if any user other than 1 and 2, we raise this error
            status:"fail",
            message: "invalid user type"
        })
    }

    const newUser = await user.create({ //how we create a user,ensure the usermodel from user.js is imported
        userType:body.userType,
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        password:body.password,
        confirmPassword: body.confirmPassword,

    });


    //to prevent exposure of user data
    const result = newUser.toJSON() // The newuser-a sequelize object, converted to a js object

    delete result.password;
    delete result.deletedAt; // deleting this two coz the user doesnt need to see them
    
    result.token= generateToken({ //results.token adds the token to the users javascript object
        id:result.id //creates a JWT coontaining users id

    });



    if(!result){ //if the user is not a new user
        return res.status(400).json({
            status:"fail",
            message: "Failed to create the user"
        });

    }
    return  res.status(201).json({ //if a user is created successfuly
        status:"success",
        data:result,
    });





};

module.exports = {signup};