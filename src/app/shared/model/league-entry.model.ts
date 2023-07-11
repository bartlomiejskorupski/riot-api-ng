export const LeagueEntryType = {
  FLEX: 'RANKED_FLEX_SR',
  SOLO: 'RANKED_SOLO_5x5'
}

export interface LeagueEntryResponse {
  leagueId?: string;
  summonerPuuid?: string;
  queueType?: string;
  tier?: string;
  rank?: string;
  leaguePoints?: number;
  wins?: number;
  losses?: number;
  hotStreak?: boolean;
  veteran?: boolean;
  freshBlood?: boolean;
  inactive?: boolean;
  seriesWins?: number;
  seriesLosses?: number;
  seriesProgress?: string;
  seriesTarget?: number;
  emblemUrl?: string;
  winRatio?: string;
}