const authModel = require('../schemas/authSchema');


async function getUser(req, res) {
    try {
        const result = await authModel.find({ username: req.body.username });
        res.status(200).json(result);

    } catch (error) {
        res.status(404).json(error);
    }
}

async function registerUser(req, res) {
    try {
        console.log(authModel)
        const { cnfm_password, ...rest } = req.body;
        console.log('registering user ', rest);
        const newUser = new authModel(rest);
        const result = await newUser.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json(error);
    }
}

async function loginUser(req, res) {
    console.log('logging user', req.body)
    const { username, password } = req.body;
    try {
        const result = await authModel.findOne({ username, password });
        // const result = await newUser.save();
        console.log('login result', result);
        if (result)
            res.status(200).json({ success: true, ...result._doc, password: 'xxxx' });
        else
            //unathorized
            res.status(401).json({ success: false });

    }
    catch (error) {
        res.status(404).json({ success: false });
    }
}


module.exports = {
    getUser,
    registerUser,
    loginUser,
}