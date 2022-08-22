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
      where: {
        inProgress,
      },
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
}
