import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { fetchAccountData } from '@/configs/fetchData';

@Injectable()
export class LoLStatusV4Service {
  private readonly apiKey = process.env.RIOT_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getStatus(region: string): Promise<any> {
    const url = `https://${region}.api.riotgames.com/lol/status/v4/platform-data?api_key=${this.apiKey}`;
    return fetchAccountData(this.httpService, this.apiKey, url);
  }
}
