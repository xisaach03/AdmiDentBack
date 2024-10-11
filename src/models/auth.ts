import bcrypt from 'bcrypt';
import User from '../models/users'


const SALT_ROUNDS = 7;

class Authenticator {

//LISTO
    registerUser = async (name: string, email: string, password: string, role: string) => {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            status: 'active'
        });

        await newUser.save();
        return newUser;
    }

    loginUser = async (email: string, password: string) => {
        console.log(email)
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Wrong email');
        }

        if (user.status != 'active') {
            throw new Error('Account desactivated');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Wrong password')
        }

        return user;
    }
}

const auth = new Authenticator();
export default auth;
