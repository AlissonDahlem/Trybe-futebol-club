import { RequestHandler } from 'express';
import MatchesService from '../services/matchesService';
import LoginService from '../services/loginService';

export default class MatchesController {
  private _matchesService: MatchesService;
  private _loginService: LoginService;

  constructor() {
    this._matchesService = new MatchesService();
    this._loginService = new LoginService();
  }

  public listAll:RequestHandler = async (_req, res): Promise<void> => {
    const matches = await this._matchesService.listAll();

    res.status(200).json(matches);
  };

  public matchesInProgress:RequestHandler = async (req, res, next): Promise<void> => {
    const { inProgress } = req.query;
    if (!inProgress) return next();
    const inProgressFilter = inProgress ? 1 : 0;
    const matches = await this._matchesService.matchesInProgress(inProgressFilter);
    res.status(200).json({ inProgressFilter, matches });
  };

  public createMatchInProgress: RequestHandler = async (req, res): Promise<void> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { authorization: token } = req.headers as { authorization: string };
    await this._loginService.validate(token);
    if (homeTeam === awayTeam) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'Unauthorized';
      throw error;
    }
    const match = await this._matchesService.createMatchInProgress(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(match);
  };
}
