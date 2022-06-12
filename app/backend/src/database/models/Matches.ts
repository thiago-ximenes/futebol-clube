import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
