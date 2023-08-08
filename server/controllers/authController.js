const authModel = require('../schemas/authSchema');


async function getUser(req, res) {
    const result = await authModel.find({ username: req.body.username });
    res.status(200).json(result);
}

async function registerUser(req, res) {
    console.log(authModel)
    const { cnfm_password, ...rest } = req.body;
    console.log('registering user ', rest);
    const newUser = new authModel(rest);
    const result = await newUser.save();
    res.status(200).json(result);
}

async function loginUser(req, res) {
    console.log('logging user', req.body)
    const { username, password } = req.body;
    const result = await authModel.findOne({ username, password });
    // const result = await newUser.save();
    console.log('login result', result);
    if (result)
        res.status(200).json({ success: true, ...result._doc , password: 'xxxx' });
    else
    //unathorized
        res.status(401).json({success: false});
}


module.exports = {
    getUser,
    registerUser,
    loginUser,
}