import { ChampionMasteryResponse } from "./champion-mastery.model";

export interface SummonerResponse {
  accountId?: string;
  region?: string;
  profileIconId?: number;
  revisionDate?: number;
  name?: string;
  id?: string;
  puuid?: string;
  summonerLevel?: number;
  profileIconPath?: string;
  championMasteries?: ChampionMasteryResponse[];
}