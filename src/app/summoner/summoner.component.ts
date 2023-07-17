import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription, take } from 'rxjs';
import { RiotService } from '../shared/riot.service';
import { SummonerResponse } from '../shared/model/summoner.model';
import { environment } from 'src/environments/environment';
import { LeagueEntryResponse, LeagueEntryType } from '../shared/model/league-entry.model';
import { ChampionMasteryResponse } from '../shared/model/champion-mastery.model';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit, OnDestroy {

  searchedName: string;
  searchedRegion: string;

  summoner: SummonerResponse;
  iconPath: string;

  loading = true;
  error = false;

  loadingRank = false;
  rankError = false;
  
  flexLeagueEntry: LeagueEntryResponse;
  soloLeagueEntry: LeagueEntryResponse;

  flexEmblem: string = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-diamond.png';
  soloEmblem: string = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png';

  private paramsSub: Subscription;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private riot: RiotService
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe({ next: this.queryParamsChange });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  queryParamsChange = (params: Params) => {
    this.searchedName = params['name'];
    this.searchedRegion = params['region'];
    this.loadSummoner(this.searchedRegion, this.searchedName);
  }

  loadSummoner(region: string, name: string) {
    this.loadingStart();
    this.riot.getSummoner(region, name)
      .pipe(take(1))
      .subscribe({
        next: this.summonerLoaded,
        error: this.summonerNotFound
      });
  }

  loadingStart() {
    this.error = false;
    this.loading = true;
    this.summoner = null;
    this.iconPath = null;
    this.flexLeagueEntry = null;
    this.soloLeagueEntry = null;
  }

  summonerLoaded = (summoner: SummonerResponse) => {
    this.logger.debug('Summoner loaded:', summoner.name);
    this.summoner = summoner;
    this.riot.summonerSubject.next(summoner);
    this.iconPath = environment.apiUrl + summoner.profileIconPath;
    this.loading = false;
    this.loadLeagueEntries(this.summoner);
  };

  summonerNotFound = (error: any) => {
    this.logger.debug('Summoner not found', error?.status);
    this.riot.summonerSubject.next(null);
    this.summoner = null;
    this.loading = false;
    this.error = true;
  };

  loadLeagueEntries(summoner: SummonerResponse) {
    this.logger.debug('Loading league entries');
    this.loadingRank = true;
    this.rankError = false;
    this.riot.getLeagueEntries(summoner.region, summoner.puuid)
      .pipe(take(1))
      .subscribe({
        next: this.leagueEntriesLoaded,
        error: this.leagueEntriesError
      });
  }

  leagueEntriesLoaded = (entries: LeagueEntryResponse[]) => {
    this.logger.debug(`Loaded ${entries.length} league entries`);
    this.loadingRank = false;
    this.rankError = false;
    for(const entry of entries) {
      if(entry.queueType === LeagueEntryType.FLEX) {
        this.flexLeagueEntry = entry;
      }
      if(entry.queueType === LeagueEntryType.SOLO) {
        this.soloLeagueEntry = entry;
      }
    }
  }

  leagueEntriesError = (error) => {
    this.logger.debug('Error loading league entries:', error);
    this.loadingRank = false;
    this.rankError = true;
  }

  updateSummoner() {
    this.riot.updateSummoner(this.summoner.region, this.summoner.puuid)
      .subscribe({
        next: summoner => {
          this.logger.debug(`Summoner ${summoner.name} updated`);
          this.loadSummoner(summoner.region, summoner.name);
        }
      })
  }

}
