import User from '../models/user.model.js';

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
        res.status(409).json({ message: e.message });
    };
};
