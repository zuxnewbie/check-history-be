import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class SummonerV4Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}
  async getSummonerByRsoPuuid(region: string, rsoPUUID: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/fulfillment/v1/summoners/by-puuid/${rsoPUUID}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getSummonerByAccountId(
    region: string,
    encryptedAccountId: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-account/${encryptedAccountId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getSummonerByPuuid(
    region: string,
    encryptedPUUID: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getSummonerMe(region: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/me?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getSummonerId(
    region: string,
    encryptedSummonerId: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${encryptedSummonerId}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}
