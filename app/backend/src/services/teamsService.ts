import Teams from '../database/models/TeamModel';

export default class TeamService {
  public listAll = async () => {
    const teams = await Teams.findAll();
    return teams as Teams[];
  };
}
