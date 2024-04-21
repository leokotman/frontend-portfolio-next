import Card from '@/app/_components/card/card';
import { PROJECTS } from '@/app/_lib/constants';
import Image from 'next/image';

export default function Websites() {
  return (
    <section className="flex flex-col gap-6 items-center">
      {PROJECTS.map((project) => {
        return (
          <Card key={project.imgSrc}>
            <a href={project.link} target="_blank">
              <Image
                src={`/img/${project.imgSrc}`}
                alt={project.alt}
                width={project.width}
                height={project.height}
              />
            </a>
          </Card>
        );
      })}
    </section>
  );
}
