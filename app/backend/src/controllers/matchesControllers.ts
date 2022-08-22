import { RequestHandler } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
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
}
