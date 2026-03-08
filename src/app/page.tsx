'use client';

import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Card from './_components/card/card';
import classes from './page.module.scss';
import Image from 'next/image';
import { Chip } from './_components/chip/chip';
import { useAppContext } from './_components/context/context';
import { Loader } from './_components/loader/loader';
import { getStartYearFromDates } from './_lib/helpers';
import type { IHardSkill } from './_lib/types';
import DailyAdviceChat from './_components/dailyAdviceChat/dailyAdviceChat';

export default function Home() {
  const {
    experiences,
    isLoadingExperiences,
    about,
    isLoadingAbout,
    skills,
    isLoadingSkills,
  } = useAppContext();

  const hardSkillsByCategory = skills.hardSkills.reduce<Record<string, string[]>>(
    (acc: Record<string, string[]>, { name, category }: IHardSkill) => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(name);
      return acc;
    },
    {}
  );

  const workExperiences = experiences.filter(
    (experience) => experience.company !== 'Education'
  );
  const educationExperiences = experiences.filter(
    (experience) => experience.company === 'Education'
  );

  const sortedWorkExperiences = [...workExperiences].sort(
    (a, b) => getStartYearFromDates(b.dates) - getStartYearFromDates(a.dates)
  );
  const sortedEducationExperiences = [...educationExperiences].sort(
    (a, b) =>
      getStartYearFromDates(b.dates) - getStartYearFromDates(a.dates)
  );

  return (
    <main className="p-4">
      <section className="container mx-auto text-center lg:grid lg:grid-cols-2 lg:grid-flow-col flex flex-wrap">
        <article>
          <h1 className="text-2xl mb-3">Lev Kotman</h1>
          <h2 className="text-xl mb-6">Front-end developer</h2>
          <p className="max-w-screen-md container mx-auto text-justify text-lg">
            {isLoadingAbout ? <Loader /> : about.about}
          </p>
          <DailyAdviceChat />
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
          <div className="flex flex-wrap justify-between gap-20 lg:flex-nowrap">
            <Card>
              <ul className="flex flex-col gap-4">
                <span className="flex gap-4">
                  <h3 className="text-lg">Hard skills</h3>
                  <CodeBracketIcon className="h-6 w-6 stroke-indigo-900"></CodeBracketIcon>
                </span>
                {isLoadingSkills ? (
                  <Loader />
                ) : (
                  <>
                    {hardSkillsByCategory.languages &&
                      hardSkillsByCategory.languages.length > 0 && (
                        <li className={classes.point}>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-semibold mr-2">
                              Languages:
                            </span>
                            {hardSkillsByCategory.languages.map(
                              (skill: string) => (
                                <Chip key={skill} text={skill} />
                              )
                            )}
                          </div>
                        </li>
                      )}
                    {hardSkillsByCategory.frameworks &&
                      hardSkillsByCategory.frameworks.length > 0 && (
                        <li className={classes.point}>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-semibold mr-2">
                              Frameworks:
                            </span>
                            {hardSkillsByCategory.frameworks.map(
                              (skill: string) => (
                                <Chip key={skill} text={skill} />
                              )
                            )}
                          </div>
                        </li>
                      )}
                    {hardSkillsByCategory.tools &&
                      hardSkillsByCategory.tools.length > 0 && (
                        <li className={classes.point}>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-semibold mr-2">
                              Tools:
                            </span>
                            {hardSkillsByCategory.tools.map(
                              (skill: string) => (
                                <Chip key={skill} text={skill} />
                              )
                            )}
                          </div>
                        </li>
                      )}
                    {hardSkillsByCategory.backend &&
                      hardSkillsByCategory.backend.length > 0 && (
                        <li className={classes.point}>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-semibold mr-2">
                              Backend / APIs:
                            </span>
                            {hardSkillsByCategory.backend.map(
                              (skill: string) => (
                                <Chip key={skill} text={skill} />
                              )
                            )}
                          </div>
                        </li>
                      )}
                  </>
                )}
              </ul>
            </Card>
            <div
              className="h-full w-1.5 rounded-md lg:block hidden"
              style={{ backgroundColor: 'rgba(133, 62, 222, 0.6)' }}
            />
            <Card>
              <ul className="flex flex-col gap-4">
                <span className="flex gap-4">
                  <h3 className="text-lg">Soft skills</h3>
                  <ChatBubbleLeftRightIcon className="h-6 w-6 stroke-indigo-900"></ChatBubbleLeftRightIcon>
                </span>

                {isLoadingSkills ? (
                  <Loader />
                ) : (
                  skills.softSkills.map(
                    (skill: string, index: number) => (
                      <li key={index} className={classes.point}>
                        <Chip text={skill} />
                      </li>
                    )
                  )
                )}
              </ul>
            </Card>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl text-center">Experiences</h2>
          {isLoadingExperiences ? (
            <ul className="flex flex-col gap-4">
              <Loader />
            </ul>
          ) : (
            <>
              <h3 className="text-lg mt-4">Work experience</h3>
              <ul className="flex flex-col gap-4">
                {sortedWorkExperiences.map((experience) => {
                  return (
                    <li
                      key={`${experience.dates}-${experience.company}-${experience.position}`}
                      className={classes.experiences}
                    >
                      <p>{experience.dates}</p>
                      <p>
                        <b>{experience?.position}</b> {experience?.company}
                      </p>
                      <p>{experience.description}</p>
                    </li>
                  );
                })}
              </ul>
              <h3 className="text-lg mt-6">Education</h3>
              <ul className="flex flex-col gap-4">
                {sortedEducationExperiences.map((experience) => {
                  return (
                    <li
                      key={`${experience.dates}-${experience.company}-${experience.position}`}
                      className={classes.experiences}
                    >
                      <p>{experience.dates}</p>
                      <p>
                        <b>{experience?.position}</b> {experience?.company}
                      </p>
                      <p>{experience.description}</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <div className="flex"></div>
        </Card>
      </section>
    </main>
  );
}
