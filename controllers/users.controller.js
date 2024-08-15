const User = require('../models/users.model');
const bcrypt = require('bcryptjs');





const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}




const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        //Validate input data
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists! Login instead' });
        }
        // encrypting password
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        return res.status(201).json({ user })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}




const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //Validate input data
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Email does not exist! please sign up' });
        }

        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "incorrect password"})
        }
        return res.status(200).json({message: "login successful"})
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllUsers,
    signUp,
    login
}
