import { RequestHandler } from 'express';
import TeamService from '../services/teamsService';

export default class TeamController {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
  }

  public listAll:RequestHandler = async (_req, res): Promise<void> => {
    const teams = await this._teamService.listAll();
    res.status(200).json(teams);
  };

  public listOne:RequestHandler = async (req, res): Promise<void> => {
    const team = await this._teamService.listOne(req.params.id);
    res.status(200).json(team);
  };
}
