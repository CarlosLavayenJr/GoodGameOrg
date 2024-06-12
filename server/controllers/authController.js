const User = require('../server/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password } = req.body;
    //Ensuring both fields are entered:
        if (!username || !password){
            return res.status(400).json({ message: 'Both a username AND password must be entered to register!'})
        }
    //Ensuring the username isn't already in use
        try {
            const takenUser = await User.find({username})
            if (takenUser) {
                return res.status(409).json({message: 'Username already in use'})
            }
    //Error Catch
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error!', error: error.message})
        }
    //Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.send('User Registered!');
};

const login = async (req, res) => {
    const { username, password } = req.body;
    //Requiring name and password to bee entered
    if (!username || !password) {
        return res.status(400).json({message: 'Both Username and Password must be filled in!'})
    }
    
    try {
    //Finding the user
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid Credentials!');
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
    } catch(error) {
        res.status(500).json({message: 'Internal Server Error!', error: error.message})
    }

};

module.exports = { register, login };
