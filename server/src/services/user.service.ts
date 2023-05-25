import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../utils/config';

class UserService {
  static async authenticateWithPassword(email: string, password: string) {
    const user = await User.findOne({ email });
    let userResponse;
    //signin
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;
      userResponse = user;
    } else {
      //signup
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({ email, password: hash });
      userResponse = await newUser.save();
    }

    const { password: pw, ...userWithoutPassword } = userResponse.toJSON();
    const token = jwt.sign({ id: userResponse?._id }, config.JWT);
    return { user: userWithoutPassword, token };
  }
}

export default UserService;
