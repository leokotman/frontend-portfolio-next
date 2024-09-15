'use client';

import { ReactNode, useContext, createContext } from 'react';
import {
  useAboutQuery,
  useContactsQuery,
  useExperiencesQuery,
  useProjectsQuery,
  useSkillsQuery,
} from '@/app/_lib/hooks';
import {
  IAboutMe,
  IContactsFromDB,
  IExperience,
  IProjectsFromDB,
  ISkills,
} from '@/app/_lib/types';

interface AppContextProviderParams {
  children: ReactNode;
}

const EMPTY_CONTACTS = {
  address: '',
  phone: '',
  weblinks: [{ link: '', name: '' }],
  email: '',
};
const EMPTY_PROJECTS = [
  {
    link: '',
    imgSrc: '',
    alt: '',
    width: 0,
    height: 0,
    projectText: '',
    repo: '',
  },
];

export const AppContext = createContext({
  contacts: EMPTY_CONTACTS as IContactsFromDB,
  experiences: [] as IExperience[],
  about: { about: '' } as IAboutMe,
  skills: { hardSkills: [], softSkills: [] } as ISkills,
  projects: {
    websites: EMPTY_PROJECTS,
    games: EMPTY_PROJECTS,
  } as IProjectsFromDB,
  isLoadingContacts: false as boolean,
  isLoadingExperiences: false as boolean,
  isLoadingAbout: false as boolean,
  isLoadingSkills: false as boolean,
  isLoadingProjects: false as boolean,
});

export default function AppContextProvider(params: AppContextProviderParams) {
  const { children } = params;
  const { data: contacts = EMPTY_CONTACTS, isLoading: isLoadingContacts } =
    useContactsQuery();
  const { data: experiences = [], isLoading: isLoadingExperiences } =
    useExperiencesQuery();
  const { data: about = { about: '' }, isLoading: isLoadingAbout } =
    useAboutQuery();
  const {
    data: skills = { hardSkills: [], softSkills: [] },
    isLoading: isLoadingSkills,
  } = useSkillsQuery();
  const {
    data: projects = { websites: [], games: [] },
    isLoading: isLoadingProjects,
  } = useProjectsQuery();

  return (
    <AppContext.Provider
      value={{
        contacts,
        experiences,
        isLoadingContacts,
        isLoadingExperiences,
        about,
        isLoadingAbout,
        skills,
        isLoadingSkills,
        projects,
        isLoadingProjects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
