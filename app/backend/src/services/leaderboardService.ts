import Team from '../database/models/Teams';

export default class LeaderboardService {
  public static async getLeaderboard() {
    return Team.findAll({
      
    })
}
