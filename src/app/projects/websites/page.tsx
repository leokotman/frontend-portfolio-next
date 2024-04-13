import { PROJECTS } from '@/app/_lib/constants';
import Image from 'next/image';

export default function Websites() {
  return (
    <div>
      Websites
      {PROJECTS.map((project) => {
        return (
          <a key={project.imgSrc} href={project.link} target="_blank">
            <Image
              src={`/img/${project.imgSrc}`}
              alt={project.alt}
              width={project.width}
              height={project.height}
            />
          </a>
        );
      })}
    </div>
  );
}
