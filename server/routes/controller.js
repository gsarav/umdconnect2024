var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Business = require("../models/Business");

//Personal business page 
router.get('/:_id', async(req, res) => {
    if (!req.isAuthenticated()) { 
      res.redirect('/login');
    }
    const _id = ObjectID(req.session.passport.business);
    Business.findOne({ _id }, (err, results) => {
      if (err) {
        throw err;
      }
      res.render('/profile', { ...results });
    });
  });

  router.post('/')