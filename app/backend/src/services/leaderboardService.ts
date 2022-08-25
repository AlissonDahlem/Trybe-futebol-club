import ILeaderboard from '../interfaces/iLeaderboard';
// import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModel';
import IMatches from '../interfaces/IMatches';
// import Matches from '../database/models/MatchesModel';

export default class LeaderboardService {
  public createLeaderboard = (teams: Teams[]) => {
    const leaderboard: ILeaderboard[] = [];

    teams.forEach((team) => {
      leaderboard.push({
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      });
    });
    return leaderboard;
  };

  public countTotalGames = (leaderboard: ILeaderboard[], matches: IMatches[]) => {
    const seededLeaderboard: ILeaderboard[] = leaderboard;

    matches.forEach((mat) => {
      const teamHome = seededLeaderboard.find((tea) =>
        tea.name === mat.teamHome.teamName) as ILeaderboard;

      const teamAway = seededLeaderboard.find((tea) =>
        tea.name === mat.teamAway.teamName) as ILeaderboard;

      if (mat.teamHome.teamName === teamHome?.name || mat.teamAway.teamName === teamAway?.name) {
        teamHome.totalGames += 1;
        teamAway.totalGames += 1;
        teamHome.goalsFavor += mat.homeTeamGoals;
        teamHome.goalsOwn += mat.awayTeamGoals;
        teamAway.goalsFavor += mat.awayTeamGoals;
        teamAway.goalsOwn += mat.homeTeamGoals;
      }
    });
    return seededLeaderboard;
  };

  public countVictoriesAndLooses = (leaderboard: ILeaderboard[], matches: IMatches[]) => {
    const seededLeaderboard: ILeaderboard[] = leaderboard;

    matches.forEach((mat) => {
      const teamHome = seededLeaderboard.find((tea) =>
        tea.name === mat.teamHome.teamName) as ILeaderboard;

      const teamAway = seededLeaderboard.find((tea) =>
        tea.name === mat.teamAway.teamName) as ILeaderboard;

      if (mat.homeTeamGoals > mat.awayTeamGoals) {
        // time de casa recebe vitoria e time de fora recebe derrota e soma os pontos
        teamHome.totalVictories += 1; teamAway.totalLosses += 1; teamHome.totalPoints += 3;
      } else if (mat.homeTeamGoals === mat.awayTeamGoals) {
        // em caso de empate ambos times rece soma os pontosbem + 1 empate e soma os pontos
        teamHome.totalDraws += 1; teamAway.totalDraws += 1;
        teamHome.totalPoints += 1; teamAway.totalPoints += 1;
      } else {
        // time de fora recebe vitoria e time de casa recebe derrota e soma os pontos
        teamAway.totalVictories += 1; teamHome.totalLosses += 1; teamAway.totalPoints += 3;
      }
    });
    return seededLeaderboard;
  };

  public calculateEfficiency = (leaderboard: ILeaderboard[]) => {
    const leaderboar: ILeaderboard[] = leaderboard;
    for (let i = 0; i < leaderboar.length; i += 1) {
      const firstCalc = leaderboar[i].totalPoints / (leaderboar[i].totalGames * 3);
      const efficiency = firstCalc * 100;
      leaderboar[i].efficiency = parseFloat(efficiency.toFixed(2));
    }
    return leaderboar;
  };

  public calculateGoalsBalance = (leaderboard: ILeaderboard[]) => {
    const leaderboar: ILeaderboard[] = leaderboard;
    for (let i = 0; i < leaderboar.length; i += 1) {
      leaderboar[i].goalsBalance = leaderboar[i].goalsFavor - leaderboar[i].goalsOwn;
    }
    return leaderboar;
  };

  public seedLeaderboard = async (leaderboard: ILeaderboard[], matches: IMatches[]) => {
    const leaderboardWithTotalGames = this.countTotalGames(leaderboard, matches);
    const leaderboardAtt = this.countVictoriesAndLooses(leaderboardWithTotalGames, matches);
    const leaderboardEfficiency = this.calculateEfficiency(leaderboardAtt);
    const leaderboardComplete = this.calculateGoalsBalance(leaderboardEfficiency);
    return leaderboardComplete;
  };
}
