const user = require("../db/models/user");


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

    if(!newUser){ //if the user is not a new user
        return res.status(400).json({
            status:"fail",
            message: "Failed to create the user"
        });

    }
    return  res.status(201).json({ //if a user is created successfuly
        status:"success",
        data:newUser,
    });





};

module.exports = {signup};