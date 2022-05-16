import StatusCodes from 'http-status-codes';
//local
import User from '../models/User.js';

const register = async(req, res) => {
    // using the mognoose model we are validating the User model entities and their restrictions
    const user = await User.create({...req.body });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async(req, res) => {
    res.send('login user');
};

export { login, register };