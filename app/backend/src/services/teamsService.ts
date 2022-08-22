import Teams from '../database/models/TeamModel';

export default class TeamService {
  public listAll = async () => {
    const teams = await Teams.findAll();
    return teams as Teams[];
  };

  public listOne = async (id: string) => {
    const team = await Teams.findByPk(id);
    if (team === null) {
      const error = new Error('Id not found');
      error.name = 'notFound';
      throw error;
    }
    return team as Teams;
  };
}
