import { getCookie } from "typescript-cookie";

export interface LinkInterface {
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
  {
    name: 'N818PE - CMS',
    url: 'https://n818pe.com/cms',
    icon: './ryan.png',
  },
  {
    name: 'N818PE - Wish List',
    url: 'https://n818pe.com/wishlist',
    icon: './ryan.png',
  },
  {
    name: 'Scale Mates',
    url: 'https://scalemates.com',
    icon: './scm.svg',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: './facebook.png',
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