export interface ChampionMasteryResponse {
  championPointsUntilNextLevel?: number;
  chestGranted?: boolean;
  championId?: number;
  lastPlayTime?: number;
  championLevel?: number;
  championPoints?: number;
  championPointsSinceLastLevel?: number;
  summonerId?: string;
  tokensEarned?: number;
  championIconPath?: string;
  championData: {
    id: number;
    name: string;
    alias: string;
    squarePortraitPath: string;
    roles: string[];
  }
}