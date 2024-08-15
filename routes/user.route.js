const express = require('express');
const router = express.Router();

const { getAllUsers, signUp } = require('../controllers/users.controller')


router.get('/',getAllUsers);
router.post('/signup', signUp)


module.exports = router;