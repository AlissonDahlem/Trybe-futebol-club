import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import 'dotenv/config';
import Users from '../database/models/UserModel';

export default class LoginService {
  public login = async (email: string, password: string) => {
    const user = await Users.findOne({
      where: { email },
    }) || { password: '' };

    const comparePassword = await compare(password, user.password);

    if (!user || !comparePassword) {
      const error = new Error('Incorrect email or password');
      error.name = 'Unauthorized';
      throw error;
    }

    const { password: userPassword, ...userWithoutPassword } = user;
    const token = sign(
      userWithoutPassword,
      process.env.JWT_SECRET as string,
      { expiresIn: '1d',
        algorithm: 'HS256' },
    );
    return token;
  };
}
