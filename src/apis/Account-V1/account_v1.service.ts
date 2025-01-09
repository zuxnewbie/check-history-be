import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class AccountV1Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getAccountByPuuid(region: string, puuid: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getAccountByRiotID(
    region: string,
    gameName: string,
    tagLine: string,
  ): Promise<any> {
    const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}
