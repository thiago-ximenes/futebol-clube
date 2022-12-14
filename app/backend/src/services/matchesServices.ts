import Team from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesServices {
  static async getAllMatches() {
    return Matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  static async getById(id: number) {
    return Matches.findByPk(id);
  }

  static async createMatch(match: any) {
    return Matches.create(match);
  }

  static async finishMatch(id: number) {
    return Matches.update({ inProgress: false }, { where: { id } });
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    return Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
