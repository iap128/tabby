export interface LinkInterface {
  name: string;
  url: string;
  icon: string;
}

const getLinks = (): LinkInterface[] => {
  const links = window.localStorage.getItem('links');
  if (links) {
    return JSON.parse(links);
  }
  return [];
}

export const apiKey = '7c8632e7f0c34cfa8632e7f0c36cfa4a';

export const Config = {
  stationID: window.localStorage.getItem('id'),
  weatherZip: window.localStorage.getItem('zip'),
  links: getLinks(),
};


/*
KORBEAVE588
97008
*/