const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const passport = require("passport");


// POST registering for business card
router.post('/register', async (req, res) => {
 try {
    const {name, description, address, link, email, password } = req.body;
    const business = await Business.findOne({ Email: email });
    //Checks if email is already registered
    //if (business){
        //return res.status(500).json({
            //message: "User already exists! Try logging in.",
            //type: "warning",
          //});
    //} 
    //
    // Salt and hash password
    const hashed = await bcrypt.hash(password, 10);
    const newBusiness = await Business.create({
        Name: name, 
        Address: address, 
        Description: description,
        Link: link,
        Email: email,
        Password: hashed
    });
    res.status(201).json({message: 'Business created', newBusiness});
    // Redirect to business profile
 } catch(error) {
    console.log(error);
    }
});

/*
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const business = await Business.findOne({ Email: email });
        if (business === null){
            res.render('/login', {})
        }
        const validPassword = await bcrypt.compare(password, business.Password);
        if (validPassword){
            //Redirect to that businesses profile (using object id in mongo)
        }
    } catch (error){
        console.log(error);
    }
});
*/

// POST logging in
router.post( "/login", passport.authenticate("local", { session: false }), (req, res) => { 
        req.session.name = req.body.username; 
        req.session.save();
        
        return res.redirect("/"); 
    } 
); 

// GET business profile page 
router.get('/profile', async (req,res) => {
    try {
        res.render('profile')
    } catch (error) {

    }
});

// GET logout page/button
router.get('/logout', async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('index');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
