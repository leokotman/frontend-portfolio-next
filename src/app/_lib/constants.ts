import { IExperience } from './types';

export const EXPERIENCES: IExperience[] = [
  {
    dates: 'Sep 2022 - Present',
    position: 'Front-end developer',
    description:
      'Engaged in developing client-centric web applications for sectors including finance, real estate, and job search platforms. Emphasised responsive design and seamless user experiences across all projects. Utilise a tech stack: React, JavaScript, CSS, Typescript, Material UI, alongside integrating various query libraries and state management tools.',
    company: 'Dualboot Partners',
  },
  {
    dates: 'Oct 2021',
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
    dates: '2019 – 2020',
    position: 'Bank representative',
    company: 'Tinkoff',
    description: 'Bank representative',
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
    'CSS3, SCSS',
    'JavaScript',
    'ReactJS',
    'Typescript',
    'State management (Redux/Zustand)',
    'RESTful APIs (Axios, React-query)',
    'CSS libraries/frameworks (MUI, Bootstrap)',
  ],
  softSkills: [
    'Analytical mind',
    'Creative thinking',
    'Attentive towards details',
    "Conflicts' managment",
  ],
};

export const CONTACTS = {
  address: 'Montenegro, Herceg Novi',
  phone: '+382(68)498-108',
  webLinks: [
    { name: 'My Github profile', link: 'https://github.com/leokotman' },
    { name: 'levkotman@gmail.com', link: 'mailto:levkotman@gmail.com' },
    {
      name: 'LinkedIn profile',
      link: 'https://www.linkedin.com/in/lev-kotman-1892031ba/',
    },
  ],
};

export const PROJECTS = [
  {
    link: 'https://leokotman.github.io/local_lang_vue/',
    imgSrc: '6.png',
    alt: 'Serbian-English learning app',
    width: 1140,
    height: 600,
    projectText: 'Serbian-English learning app',
  },
  {
    link: 'https://leokotman.github.io/forum_lp/',
    imgSrc: '7.png',
    alt: 'Forum Registration landing page',
    width: 1140,
    height: 600,
    projectText: 'Security Forum registration landing page',
  },
  {
    link: 'https://leokotman.github.io/JesKotman-artist/',
    imgSrc: '2.png',
    alt: 'project2-artists-page',
    width: 1140,
    height: 600,
    projectText: "Artist's landing page",
  },
  {
    link: 'https://leokotman.github.io/4-HTML5-CSS3/',
    imgSrc: '1.png',
    alt: 'project1-course-site',
    width: 1140,
    height: 480,
    projectText: 'Website Landing page',
  },
  {
    link: 'https://leokotman.github.io/rockstone-swiper/',
    imgSrc: '3.png',
    alt: 'project3-mobile-React-app',
    width: 480,
    height: 350,
    projectText: 'Messages & Current time – Swiper React mobile app',
  },
  {
    link: 'https://leokotman.github.io/drum-kit/',
    imgSrc: '4.png',
    alt: 'project4-drumkit-vanillajs',
    width: 480,
    height: 350,
    projectText: 'Play drums on Vanilla JS',
  },
  {
    link: 'https://leokotman.github.io/My-portfolio/',
    imgSrc: '5.png',
    alt: 'project5-first-portfolio',
    width: 480,
    height: 350,
    projectText: 'First Portfolio',
  },
];
