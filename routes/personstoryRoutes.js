const express = require('express');

const  PersonStory = require('../controller/personstoryController');

const personstoryrouter   = express.Router(); // get route object getPersonStory


personstoryrouter.use('/add-person-story', PersonStory.addPersonStory);

personstoryrouter.use('/get-person-story', PersonStory.getPersonStory);

module.exports = personstoryrouter;