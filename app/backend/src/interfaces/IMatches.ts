import Matches from '../database/models/MatchesModel';

export default interface IMatches extends Matches {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}
