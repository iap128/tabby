import { getCookie } from "typescript-cookie";

export interface LinkInterface {
  name: string;
  url: string;
  icon: string;
}

export const Config = {
  stationID: getCookie('id'),
  weatherZip: getCookie('zip'),
  apiKey: getCookie('key'),
  links: JSON.parse(getCookie('links') || '{}') as LinkInterface[],
};


/*
KORBEAVE588
97008
7c8632e7f0c34cfa8632e7f0c36cfa4a
*/