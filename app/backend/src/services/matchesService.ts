import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  public listAll = async () => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };

  public matchesInProgress = async (inProgress: number) => {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };

  public createMatchInProgress = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const checkHomeTeam = await Teams.findByPk(homeTeam);
    const checkAwayTeam = await Teams.findByPk(awayTeam);
    if (!checkAwayTeam || !checkHomeTeam) {
      const error = new Error('There is no team with such id!');
      error.name = 'notFound';
      throw error;
    }
    const match = await Matches.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    return match;
  };

  public finishMatch = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };
}
