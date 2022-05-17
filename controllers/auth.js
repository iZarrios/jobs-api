import StatusCodes from 'http-status-codes';
//local
import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const register = async(req, res) => {
    // using the mognoose model we are validating the User model entities and their restrictions
    const user = await User.create({...req.body });

    const token = user.createJWT();
    console.log('Account created successfully');
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide an email or password');
    }
    const user = await User.findOne({ email }); //we can either use id to search or email as both are distinct

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    console.log('logged in successfully');
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

export { login, register };