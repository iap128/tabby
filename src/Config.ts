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
  stationID: 'KORBEAVE588',
  weatherZip: '97008',
  apiKey: '7c8632e7f0c34cfa8632e7f0c36cfa4a',
  links: Links,
};
