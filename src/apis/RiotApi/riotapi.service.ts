import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RiotApiService {
    private readonly apiKey = process.env.RIOT_API_KEY;
  
    constructor(private readonly httpService: HttpService) {}
  
    async getSummonerByName(platform: string): Promise<any> {
      const url = `https://${platform}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-a3e950c1-45c3-4239-a1bc-33c22827f7ed`;
      try {
        const response = await lastValueFrom(
          this.httpService.get(url, {
            headers: { 'X-Riot-Token': this.apiKey },
          }),
        );
        console.log('response', response, url);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching data for platform ${platform}: ${error.message}`);
      }
    }
}