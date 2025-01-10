import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class SpectatorV5Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}
  async getSpectator(region: string, encryptedPUUID: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${encryptedPUUID}?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }

  async getListFeaturedGame(region: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/spectator/v5/featured-games?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}
