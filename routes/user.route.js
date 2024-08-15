const express = require('express');
const router = express.Router();

const { getAllUsers, signUp, login } = require('../controllers/users.controller')


router.get('/',getAllUsers);
router.post('/signup', signUp);
router.get('/login', login)


module.exports = router;