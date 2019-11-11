import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(404).json({auth:false, message: 'No token provied'});
    }
    const decode = await jwt.verify(token, process.env.SECRET);
    req.userId = decode.id;
    next();
};