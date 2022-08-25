import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';
import TeamService from '../services/teamsService';
import MatchesService from '../services/matchesService';
import IMatches from '../interfaces/IMatches';
// import Matches from '../database/models/MatchesModel';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;
  private _teamService: TeamService;
  private _matchesService: MatchesService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
    this._teamService = new TeamService();
    this._matchesService = new MatchesService();
  }

  public homeLeaderboard: RequestHandler = async (_req, res) => {
    const teams = await this._teamService.listAll();
    const leaderboard = this._leaderboardService.createLeaderboard(teams);
    const matches: IMatches[] = await this._matchesService.matchesInProgress(0);
    const seededLeaderboard = await this._leaderboardService.seedLeaderboard(leaderboard, matches);
    res.status(200).json(seededLeaderboard);
  };
}
