import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'home_team',
  targetKey: 'id',
  as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'away_team',
  targetKey: 'id',
  as: 'teamAway',
});
Teams.hasMany(Matches, {
  foreignKey: 'home_team',
  sourceKey: 'id',
  as: 'homeMatches',
});
Teams.hasMany(Matches, {
  foreignKey: 'away_team',
  sourceKey: 'id',
  as: 'awayMatches',
});
