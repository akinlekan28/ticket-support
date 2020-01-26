const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models').User
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// @desc      Register user
// @route     POST /api/v1/user/register
// @access    Public
exports.register = async (req, res) => {

    //Validate req body
    const {errors, isValid} = validateRegisterInput(req.body);

        //Return invalid errors as response
      if (!isValid) {
        return res.status(400).json(errors);
      }
    
    try {
        const user = await User.findOne({where: { email: req.body.email }});
        
        if (user) {
            return res.status(400).json({status: false, message: "User with this email already exist"});
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) throw err;
                User.create({
                  name: req.body.name,
                  email: req.body.email,
                  password: hash
                })
                .then(registeredUser => res.status(201).json({status: true, message: "User successfully created", registeredUser}))
                .catch(err => {
                    return res.status(403).json({status: false, message: "An error occured while trying to run a query", err});
                })
            })
        })

    } catch (error) {
        res.status(403).json({status: false, message: "An error occured while trying to run a query", error})
    }  
}

//@route  Post api/user/login
//@desc Login user route
//@access Public
exports.login = async (req, res) => {
    //Validate req body
    const { errors, isValid } = validateLoginInput(req.body);

    //Return invalid errors as response
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email
    const password = req.body.password

    try {
        const userDetails = await User.findOne({ where: { email } })
        if (!userDetails) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }

        bcrypt.compare(password, userDetails.password).then(isMatch => {
            if(isMatch){
                //User match
                const payload = {id: userDetails.id, name: userDetails.name, role: userDetails.role};

                //Sign token
                jwt.sign(payload, process.env.SECRETKEY, {expiresIn: 7200}, (e, token) => {
                    res.json({success: true, token: "Bearer "+token})
                });
            } else {
                errors.password = "Password incorrect"
                return res.status(400).json(errors)
            }
        })

    } catch (error) {
        res.status(403).json({status: false,message: "An error occured while trying to run a query",error});
    }
}

//@route  Get api/user/
//@desc Get active users route
//@access Private
exports.allUsers = async (req, res) => {
    try {
        const users = await User.findAll({where: {isDelete: 0}});
        return res.json({count: users.length, users})
    } catch (error) {
        return res.status(403).json({status: false, message: "An error occured while trying to run a query", error});
    }
}

//@route  Get api/user/deleted
//@desc Get deleted users route
//@access Private
exports.deletedUsers = async (req, res) => {
    try {
        const users = await User.findAll({where: {isDelete: 1}});
        return res.json({count: users.length, users})
    } catch (error) {
        return res.status(403).json({status: false, message: "An error occured while trying to run a query", error});
    }
}

//@route  Put api/user/
//@desc  Delete user route
//@access Private
exports.deleteUser = async (req, res) => {
    console.log(req.params.id)
    try {
        //Check if logged user is an admin
        if (!req.body.role && req.body.role !== 'admin'){
            return res.status(401).json({status: false, message: "You do not have required access to perform this action"})
        }

        //Update user isDelete column to 1
        const user = await User.update({ isDelete: 0 },{ where: { id: req.params.id } });
            return res.json({status: true, message: "User Successfully deleted!", user})
            
    } catch (error) {
        return res.status(403).json({status: false, message: "An error occured while trying to run a query", error});
    }
}