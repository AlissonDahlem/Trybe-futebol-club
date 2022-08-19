import { RequestHandler } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public login:RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('caiu no erro');
      const error = new Error('All fields must be filled');
      error.name = 'missingFields';
      throw error;
    }
    const token = await this._loginService.login(email, password);
    res.status(200).json({ token });
  };

  public validate:RequestHandler = async (req, res): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error('Token not found');
      error.name = 'Unauthorized';
      throw error;
    }

    const role = await this._loginService.validate(authorization);

    res.status(200).json({ role });
  };
}
