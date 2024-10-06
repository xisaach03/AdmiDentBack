import User from '../models/users'

export const getAll = () => {

}

export const getByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email: email })
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

export const deleteByEmail = async (email: string) => {
    try {
        const user = await User.deleteOne({ email: email });
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

export const updateByEmial = async (email: string, name?: string, status?: string) => {
    try {
        const user = await User.findOne({ email: email })
        if (name && user) {
            user.name = name;
            await user.save();
        }
        if (status && user) {
            user.status = status;
            await user.save();
        }
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}

export const changePassword = async (email: string, newPassword: string) => {
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            user.password = newPassword;
        }
        return user;
    } catch {
        throw new Error('Wrong User or does not exist');
    }
}