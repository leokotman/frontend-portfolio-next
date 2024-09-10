import { IExperience, IProject } from './types';

export const EXPERIENCES: IExperience[] = [
  {
    dates: 'Sep 2022 - Present',
    position: 'Front-end developer',
    description:
      'Engaged in developing client-centric web applications for sectors including finance, real estate, and job search platforms. Emphasised responsive design and seamless user experiences across all projects. Utilise a tech stack: React, JavaScript, CSS, Typescript, Material UI, alongside integrating various query libraries and state management tools.',
    company: 'Dualboot Partners',
  },
  {
    dates: 'Nov2021 - Aug 2022',
    position: 'Frontend developer',
    description:
      'Contributed to a business entity management project, enhanced frontend functionality for a job platform project. Tech stack: React.js, Next.js, SASS, Redux, jQuery, MJML, Mailtrap.',
    company: 'Resmedia',
  },
  {
    dates: 'Jun2021 - Nov 2021',
    position: 'Web-developer',
    description:
      "Tech stack: Vue.js + Ejs. Project: business orders' and items' stock system. Fixed problems with frontend, new users' regitration.",
    company: 'Whisla',
  },
  {
    dates: '2020 – 2022',
    company: 'Education',
    description:
      'Front-end courses (Youtube; Udemy; Freecodecamp; GeekBrains - web-development React, QA; Codewars), making pet projects',
  },
  {
    dates: '2018 – 2020',
    position: 'Psychologist',
    description: 'Psychological counselling (private practice)',
  },
  {
    dates: '2015 – 2019',
    company: 'Education',
    description: 'RSUH (Psychology Institute) – bachelor',
  },
  {
    dates: '2009 – 2014',
    company: 'Education',
    description:
      'NRNU Mephi (Institute of International Relations) – specialist',
  },
];

export const SKILLS = {
  hardSkills: [
    'HTML5',
    'CSS3, SASS, JSS',
    'Git',
    'JavaScript',
    'ReactJS',
    'Typescript',
    'State management (Redux/Zustand)',
    'RESTful APIs (Axios, React-query)',
    'CSS libraries/frameworks (MUI, Bootstrap)',
    'Axios',
  ],
  softSkills: [
    'Analytical mind',
    'Creative thinking',
    'Attentive towards details',
    "Conflicts' managment",
  ],
};

export const PROJECTS: IProject[] = [
  {
    link: 'https://next-gitlog.vercel.app/',
    imgSrc: '10.png',
    alt: 'A list of commits from github',
    width: 1140,
    height: 600,
    projectText: 'Gitlog - list of github commits',
    repo: 'https://github.com/leokotman/next-gitlog',
  },
  {
    link: 'https://logic-kids.vercel.app/',
    imgSrc: '9.png',
    alt: 'Kids courses',
    width: 1140,
    height: 600,
    projectText: 'Kids courses',
    repo: 'https://github.com/leokotman/logic-kids',
  },
  {
    link: 'https://leokotman.github.io/local_lang_vue/',
    imgSrc: '6.png',
    alt: 'Serbian-English learning app',
    width: 1140,
    height: 600,
    projectText: 'Serbian-English learning app',
    repo: 'https://github.com/leokotman/local_lang_vue',
  },
  {
    link: 'https://leokotman.github.io/forum_lp/',
    imgSrc: '7.png',
    alt: 'Forum Registration landing page',
    width: 1140,
    height: 600,
    projectText: 'Security Forum registration landing page',
    repo: 'https://github.com/leokotman/forum_lp',
  },
  {
    link: 'https://leokotman.github.io/JesKotman-artist/',
    imgSrc: '2.png',
    alt: "Artist's landing page",
    width: 1140,
    height: 600,
    projectText: "Artist's landing page",
    repo: 'https://github.com/leokotman/JesKotman-artist',
  },
  {
    link: 'https://leokotman.github.io/4-HTML5-CSS3/',
    imgSrc: '1.png',
    alt: 'Website Landing page',
    width: 1140,
    height: 480,
    projectText: 'Website Landing page',
    repo: 'https://github.com/leokotman/4-HTML5-CSS3',
  },
  {
    link: 'https://leokotman.github.io/rockstone-swiper/',
    imgSrc: '3.png',
    alt: 'Messages & Current time – Swiper React mobile app',
    width: 480,
    height: 350,
    projectText: 'Messages & Current time – Swiper React mobile app',
    repo: 'https://github.com/leokotman/rockstone-swiper',
  },
  {
    link: 'https://leokotman.github.io/drum-kit/',
    imgSrc: '4.png',
    alt: 'Play drums on Vanilla JS',
    width: 480,
    height: 350,
    projectText: 'Play drums on Vanilla JS',
    repo: 'https://github.com/leokotman/drum-kit',
  },
];

export const GAMES: IProject[] = [
  {
    link: 'https://leokotman.github.io/monster-game/',
    imgSrc: 'game-monster.png',
    alt: 'Beat the monster',
    width: 400,
    height: 400,
    projectText: 'Beat the monster',
    repo: 'https://github.com/leokotman/monster-game',
  },
  {
    link: 'https://leokotman.github.io/doodle-jump/',
    imgSrc: 'game-jump.png',
    alt: 'Doodle jump',
    width: 400,
    height: 400,
    projectText: 'Doodle jump',
    repo: 'https://github.com/leokotman/doodle-jump',
  },
];
