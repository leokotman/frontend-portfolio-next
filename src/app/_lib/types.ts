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

export interface IAboutMe {
  about: string;
}

export type HardSkillCategory =
  | 'languages'
  | 'frameworks'
  | 'tools'
  | 'backend';

export interface IHardSkill {
  name: string;
  category: HardSkillCategory;
}

export interface ISkills {
  hardSkills: Array<IHardSkill>;
  softSkills: Array<string>;
}

export interface IProject {
  link: string;
  imgSrc: string;
  alt: string;
  width: number;
  height: number;
  projectText: string;
  repo: string;
}

export interface IProjectsFromDB {
  websites: Array<IProject>;
  games: Array<IProject>;
}

