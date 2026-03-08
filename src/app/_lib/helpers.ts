import type { IProject } from './types';

export const getStartYearFromDates = (dates: string): number => {
  const match = dates.match(/\d{4}/);

  if (!match) return 0;

  return parseInt(match[0], 10);
};

export const sortProjectsByImageIndexDesc = (
  projects: IProject[]
): IProject[] => {
  return [...projects].sort((project1, project2) => {
    const firstIndex = Number(project1.imgSrc.split('.')[0]);
    const secondIndex = Number(project2.imgSrc.split('.')[0]);

    return secondIndex - firstIndex;
  });
};


