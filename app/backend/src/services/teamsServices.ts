import Teams from '../database/models/Teams';

export default class TeamsServices {
  static async getAllTeams() {
    return Teams.findAll();
  }

  static async getById(id: number) {
    return Teams.findByPk(id);
  }
}
