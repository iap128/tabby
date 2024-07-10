import { getCookie } from "typescript-cookie";

interface LinkInterface {
  name: string;
  url: string;
  icon: string;
}

const Links: LinkInterface[] = [
  {
    name: 'Chrome Web Store',
    url: 'https://chromewebstore.google.com',
    icon: './webstore.png',
  },
];

export const Config = {
  stationID: getCookie('id'),
  weatherZip: getCookie('zip'),
  apiKey: getCookie('key'),
  links: Links,
};


/*
KORBEAVE588
97008
7c8632e7f0c34cfa8632e7f0c36cfa4a
*/