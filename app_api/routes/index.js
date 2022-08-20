const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    //credentialsRequired: false,
   // algorithms: ['sha1', 'RS256', 'HS256'], //HS256
    algorithms: ['HS256'],
    userProperty: 'payload'
});


router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);
    
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) 
    .put(auth, tripsController.tripsUpdateTrip);   

module.exports = router;