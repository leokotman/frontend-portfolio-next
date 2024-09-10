import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Card from './_components/card/card';
import { EXPERIENCES, SKILLS } from './_lib/constants';
import classes from './page.module.scss';
import Image from 'next/image';
import { Chip } from './_components/chip/chip';

export default function Home() {
  return (
    <main className="p-4">
      <section className="container mx-auto text-center lg:grid lg:grid-cols-2 lg:grid-flow-col flex flex-wrap">
        <article>
          <h1 className="text-2xl mb-3">Lev Kotman</h1>
          <h2 className="text-xl mb-6">Front-end developer</h2>
          <p className="max-w-screen-md container mx-auto text-justify text-lg">
            Experienced Front-end Developer with over 3 years of professional
            experience specialising in dynamic interfaces.
            <br /> Skilled in delivering high-quality web applications with
            clean code for various clients. Started developer&apos;s career path
            in 2020. Love problem-solving, making projects better.
          </p>
        </article>
        <Image
          src="/img/main-page-bg.png"
          alt="programmer-with-laptop-react-html-coding"
          width={582}
          height={576}
          style={{
            objectFit: 'cover',
          }}
          priority
        />
      </section>
      <section className="container mx-auto max-w-screen-lg flex flex-wrap justify-around gap-10 py-4">
        <Card propsClasses="flex flex-wrap justify-between gap-y-6">
          <h2 className="text-xl text-center w-full">Skills</h2>
          <div className="flex justify-between gap-20">
            <Card>
              <ul className="flex flex-col gap-4">
                <span className="flex gap-4">
                  <h3 className="text-lg">Hard skills</h3>
                  <CodeBracketIcon className="h-6 w-6 stroke-indigo-900"></CodeBracketIcon>
                </span>
                {SKILLS.hardSkills.map((skill, index) => (
                  <li key={index} className={classes.point}>
                    <Chip text={skill} />
                  </li>
                ))}
              </ul>
            </Card>
            <div
              className="h-full w-1.5 rounded-md"
              style={{ backgroundColor: 'rgba(133, 62, 222, 0.6)' }}
            />
            <Card>
              <ul className="flex flex-col gap-4">
                <span className="flex gap-4">
                  <h3 className="text-lg">Soft skills</h3>
                  <ChatBubbleLeftRightIcon className="h-6 w-6 stroke-indigo-900"></ChatBubbleLeftRightIcon>
                </span>

                {SKILLS.softSkills.map((skill, index) => (
                  <li key={index} className={classes.point}>
                    <Chip text={skill} />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Card>
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
      </section>
    </main>
  );
}
