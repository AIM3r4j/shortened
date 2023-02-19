import UserModel from '@/resources/user/user.model';
import User from '@/resources/user/user.interface';

import token from '@/utils/token';

class UserService {
    private user = UserModel;

    /**
     * Register a new user
     */
    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<User | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });
            return {
                name: user.name,
                email: user.email,
                role: user.role,
            } as User;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('Email already in use');
            }
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default UserService;
