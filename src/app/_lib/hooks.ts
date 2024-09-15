import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import {
  IAboutMe,
  IContactsFromDB,
  IExperience,
  IProjectsFromDB,
  ISkills,
} from './types';
import { useQuery } from '@tanstack/react-query';

const getContacts = async () => {
  const querySnapshot = await getDocs(collection(db, 'contacts'));
  const data: IContactsFromDB[] = [];
  querySnapshot.forEach((contact) => {
    data.push(contact.data() as IContactsFromDB);
  });

  return data;
};

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => await getContacts(),
    select: (data: IContactsFromDB[]) => data[0],
  });
};

export const getExperiences = async () => {
  const querySnapshot = await getDocs(collection(db, 'experiences'));
  const data: IExperience[] = [];
  querySnapshot.forEach((experience) => {
    experience.data().experiences.forEach((exp: IExperience) => {
      data.push(exp);
    });
  });

  return data;
};

export const useExperiencesQuery = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: async () => await getExperiences(),
  });
};

const getAbout = async () => {
  const querySnapshot = await getDocs(collection(db, 'about'));
  const data: IAboutMe[] = [];
  querySnapshot.forEach((about) => {
    data.push(about.data() as IAboutMe);
  });

  return data;
};

export const useAboutQuery = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => await getAbout(),
    select: (data: IAboutMe[]) => data[0],
  });
};

export const getSkills = async () => {
  const querySnapshot = await getDocs(collection(db, 'skills'));
  let data: ISkills[] = [];
  querySnapshot.forEach((skills) => {
    data.push(skills.data() as ISkills);
  });

  return data;
};

export const useSkillsQuery = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => await getSkills(),
    select: (data: ISkills[]) => data[0] as ISkills,
  });
};

const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, 'projects'));
  const data: IProjectsFromDB[] = [];
  querySnapshot.forEach((contact) => {
    data.push(contact.data() as IProjectsFromDB);
  });

  return data;
};

export const useProjectsQuery = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => await getProjects(),
    select: (data: IProjectsFromDB[]) => data[0],
  });
};
