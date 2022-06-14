import Team from '../database/models/Teams';
import Matches from '../database/models/Matches';
import TeamsServices from './teamsServices';

export default class LeaderboardServices {
  private static _victoryPoints = 3;
  private static _drawsPoints = 1;
  private static async getTeamMatches(teamId: number) {
    return Matches.findAll({
      where: {
        homeTeam: teamId,
        inProgress: false,
      },
    });
  }

  private static async getTeamVictories(teamId: number) {
    const teamMatches = await this.getTeamMatches(teamId);

    return teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  }

  private static async getTeamDraws(teamId: number) {
    const teamMatches = await this.getTeamMatches(teamId);

    return teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  }

  private static async getTeamVictoryPoints(teamId: number) {
    const victories = await this.getTeamVictories(teamId);

    return victories.length * this._victoryPoints;
  }

  private static async getTeamDrawPoints(teamId: number) {
    const draws = await this.getTeamDraws(teamId);

    return draws.length * this._drawsPoints;
  }

  private static async getTotalPoints(teamId: number) {
    const victoryPoints = await this.getTeamVictoryPoints(teamId);
    const drawPoints = await this.getTeamDrawPoints(teamId);

    return victoryPoints + drawPoints;
  }

  private static async getTotalGames(teamId: number) {
    const teamMatches = await this.getTeamMatches(teamId);

    return teamMatches.length;
  }

  private static async getTotalVictories(teamId: number) {
    const teamVictories = await this.getTeamVictories(teamId);

    return teamVictories.length;
  }

  private static async getTotalDraws(teamId: number) {
    const teamDraws = await this.getTeamDraws(teamId);

    return teamDraws.length;
  }

  private static async getTotalLost(teamId: number) {
    const teamMatches = await this.getTeamMatches(teamId);
    const teamVictories = await this.getTeamVictories(teamId);
    const teamDraws = await this.getTeamDraws(teamId);

    return teamMatches.length - teamVictories.length - teamDraws.length;
  }

  private static async getTotalFavorGoals(teamId: number) {
    const teamMatches = await this.getTeamMatches(teamId);

    return teamMatches
      .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  private static async getTotalOwnGoals(teamId: number) {
    const teamMatches = await this.getTeamMatches(teamId);

    return teamMatches
      .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  private static async getTotalBallanceGoals(teamId: number) {
    const totalFavorGoals = await this.getTotalFavorGoals(teamId);
    const totalOwnGoals = await this.getTotalOwnGoals(teamId);

    return totalFavorGoals - totalOwnGoals;
  }

  private static async getTeamEfficiency(teamId: number) {
    const totalPoints = await this.getTotalPoints(teamId);
    const totalGames = await this.getTotalGames(teamId);

    const efficiency = ((totalPoints / (totalGames * 3)) * 100);

    return Math.round(efficiency * 100) / 100;
  }

  private static async getTeamHomeLeaderboard() {
    const teams = await TeamsServices.getAllTeams();

    const result = teams.map(async (team: Team) => {
      const leaderboard = {
        name: team.teamName,
        totalPoints: await this.getTotalPoints(team.id),
        totalGames: await this.getTotalGames(team.id),
        totalVictories: await this.getTotalVictories(team.id),
        totalDraws: await this.getTotalDraws(team.id),
        totalLosses: await this.getTotalLost(team.id),
        goalsFavor: await this.getTotalFavorGoals(team.id),
        goalsOwn: await this.getTotalOwnGoals(team.id),
        goalsBalance: await this.getTotalBallanceGoals(team.id),
        efficiency: await this.getTeamEfficiency(team.id),
      };

      return leaderboard;
    });

    return Promise.all(result);
  }

  public static async getTeamHomeLeaderboardSorted() {
    const leaderboard = await this.getTeamHomeLeaderboard();

    return leaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return b.goalsOwn - a.goalsOwn;
            } return a.goalsFavor - b.goalsFavor;
          } return a.goalsBalance - b.goalsBalance;
        } return a.totalVictories - b.totalVictories;
      } return a.totalPoints - b.totalPoints;
    }).reverse();
  }
}
