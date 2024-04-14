import Card from './_components/card/card';
import { EXPERIENCES, SKILLS } from './_lib/constants';
import classes from './page.module.scss';

export default function Home() {
  return (
    <main className="p-4">
      <header className="container mx-auto text-center">
        <h1 className="text-2xl">Lev Kotman</h1>
        <h2 className="text-xl">Front-end developer</h2>
        <p className="max-w-screen-md container mx-auto text-justify">
          Experienced Front-end Developer with over 1.5 years of professional
          experience specialising in dynamic interfaces. Skilled in delivering
          high-quality web applications with clean code for various clients.
          Started developer&apos;s career path in 2020. Love problem-solving,
          making projects better.
        </p>
      </header>
      <section className="container mx-auto flex flex-wrap justify-around gap-10 py-4">
        <Card heading="Experience">
          <ul>
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
        <Card heading="Skills">
          <div className="flex gap-6">
            <ul>
              Hard skills
              {SKILLS.hardSkills.map((skill, index) => (
                <li key={index}>
                  <p>{skill}</p>
                </li>
              ))}
            </ul>
            <ul>
              Soft skills
              {SKILLS.softSkills.map((skill, index) => (
                <li key={index}>
                  <p>{skill}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </main>
  );
}
