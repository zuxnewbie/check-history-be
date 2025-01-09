import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export async function fetchAccountData(
  httpService: HttpService,
  apiKey: string,
  url: string,
): Promise<any> {
  try {
    const response = await lastValueFrom(
      httpService.get(url, {
        headers: { 'X-Riot-Token': apiKey },
      }),
    );
    console.log('response', response.data, url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
}
