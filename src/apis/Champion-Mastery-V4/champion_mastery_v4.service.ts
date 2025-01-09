import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class ChampionMasteryV4Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getAll(region: string, encryptedPUUID: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${encryptedPUUID}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getAChampionMastery(
    region: string,
    encryptedPUUID: string,
    championId: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${encryptedPUUID}/by-champion/${championId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getSpecifiedNumberOfTop(
    region: string,
    encryptedPUUID: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${encryptedPUUID}/top?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getPlayerTotalChampionMasteryScore(
    region: string,
    encryptedPUUID: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/${encryptedPUUID}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}
