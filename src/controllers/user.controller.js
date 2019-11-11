import User from '../models/User';
import jwt from 'jsonwebtoken';

export const signin = async (req, res) => {
    try {
        const users =  await User.find().sort('-_id');
        res.status(200).json(users);
    }catch(e) {
        console.log(e);
        res.status(500).json({message : 'Error consultando los usuarios'});
    }
};

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username,
            email,
            password
        });
        user.password = await user.encryptPassword(password);
        await user.save();
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn : 15000
        });
        res.status(200).json({
            auth : true,
            token,
            message : `User created ${username}`,
        });
    }catch(e) {
        console.log(e);
        res.status(500).json({message : 'Error registrando el usuario'});
    }
    
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if(user) {
            res.status(200).json({message : `Ususario eliminado con exito ${user.username}`});
        }else {
            res.status(400).json({})
        }
    }catch(e) {
        console.log(e);
        res.status(500).json({message: 'Error eliminando al usuario'});
    }
};
