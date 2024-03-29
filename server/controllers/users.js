import User from '../models/user.model.js';
import AboutMe from '../models/aboutme.model.js';

export const getUser = async (req, res) => {
    try {
        const user = await User.find({ username: req.params.username, password: req.params.password });
        console.log('got ' + req.params.username + ' ' + req.params.password )
        console.log(user);
        res.status(200).json(user);
    
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};

export const postUser = async (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;
    const newUser = new User({ username: name, password: pass});

    try {
        await newUser.save();
        res.status(201).json(newUser);

    } catch (e) {
        /*
        if ( e.errors['username'].message === 'Must be at least 6 characters' || e.errors['password'].message === 'Must be at least 6 characters') {
            res.status(400);
        } else {
            res.status(409);
        }
        */
        res.status(409).json({ message: e.message });
    };
};

export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.find({ username: req.params.username });
        res.status(200).json(user);
    
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const getAboutMe = async (req, res) => {
    try {
        const aboutMe = await AboutMe.find({ username: req.params.username });
        res.status(200).json(aboutMe);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}

export const putAboutMe = async (req, res) => {
    try {
        const aboutMe = new AboutMe(req.body);
        const prev = await AboutMe.find({username: req.params.username})
        if (prev.length > 0) {
            await AboutMe.updateOne({username: req.params.username}, { content: aboutMe.content })
        } else {
            await aboutMe.save()
        }
        res.status(200).json(aboutMe);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
}