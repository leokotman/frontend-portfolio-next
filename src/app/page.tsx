import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Card from './_components/card/card';
import { EXPERIENCES, SKILLS } from './_lib/constants';
import classes from './page.module.scss';

export default function Home() {
  return (
    <main className="p-4">
      <header className="container mx-auto text-center">
        <h1 className="text-2xl mb-3">Lev Kotman</h1>
        <h2 className="text-xl mb-6">Front-end developer</h2>
        <p className="max-w-screen-md container mx-auto text-justify text-lg">
          Experienced Front-end Developer with over 3 years of professional
          experience specialising in dynamic interfaces. Skilled in delivering
          high-quality web applications with clean code for various clients.
          Started developer&apos;s career path in 2020. Love problem-solving,
          making projects better.
        </p>
      </header>
      <section className="container mx-auto max-w-screen-lg flex flex-wrap justify-around gap-10 py-4">
        <Card>
          <h2 className="text-xl text-center">Experiences</h2>
          <ul className="flex flex-col gap-4">
            {EXPERIENCES.map((experience) => {
              return (
                <li key={experience.dates} className={classes.experiences}>
                  <p>{experience.dates}</p>
                  <p>
                    <b>{experience?.position}</b> {experience?.company}
                  </p>
                  <p>{experience.description}</p>
                </li>
              );
            })}
          </ul>
          <div className="flex"></div>
        </Card>
        <Card propsClasses="flex flex-wrap justify-between gap-6">
          <h2 className="text-xl text-center w-full">Skills</h2>
          <Card>
            <ul className="flex flex-col gap-4">
              <span className="flex gap-4">
                <h3 className="text-lg">Hard skills</h3>
                <CodeBracketIcon className="h-6 w-6 stroke-indigo-900"></CodeBracketIcon>
              </span>
              {SKILLS.hardSkills.map((skill, index) => (
                <li key={index} className={classes.point}>
                  <p>{skill}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <ul className="flex flex-col gap-4">
              <span className="flex gap-4">
                <h3 className="text-lg">Soft skills</h3>
                <ChatBubbleLeftRightIcon className="h-6 w-6 stroke-indigo-900"></ChatBubbleLeftRightIcon>
              </span>

              {SKILLS.softSkills.map((skill, index) => (
                <li key={index} className={classes.point}>
                  <p>{skill}</p>
                </li>
              ))}
            </ul>
          </Card>
        </Card>
      </section>
    </main>
  );
}
