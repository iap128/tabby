import { getCookie } from "typescript-cookie";

export interface LinkInterface {
  name: string;
  url: string;
  icon: string;
}

const getLinks = (): LinkInterface[] => {
  const links = getCookie('links');
  if (links) {
    return JSON.parse(links);
  }
  return [];
}

export const Config = {
  stationID: getCookie('id'),
  weatherZip: getCookie('zip'),
  apiKey: getCookie('key'),
  links: getLinks(),
};


/*
KORBEAVE588
97008
7c8632e7f0c34cfa8632e7f0c36cfa4a
*/