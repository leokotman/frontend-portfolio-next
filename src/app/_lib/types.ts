export interface IRoute {
  url: string;
  text: string;
}

export interface IExperience {
  dates: string;
  description: string;
  position?: string;
  company?: string;
}

interface IWeblink {
  link: string;
  name: string;
}
export interface IContactsFromDB {
  address: string;
  phone: string;
  weblinks: Array<IWeblink>;
  email: string;
}
