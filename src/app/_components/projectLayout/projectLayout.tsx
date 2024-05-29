import { IProject } from '@/app/_lib/types';
import Card from '../card/card';
import { Button } from '../button/button';
import Image from 'next/image';

interface IProjectLayoutProps {
  project: IProject;
}

const ProjectLayout = (props: IProjectLayoutProps) => {
  const { project } = props;
  return (
    <Card key={project.imgSrc}>
      <Button color="grayDark">
        <a
          href={project.repo}
          target="_blank"
          title={project.alt}
          aria-label={project.alt}
        >
          {project.projectText} - project&lsquo;s Repo
        </a>
      </Button>
      <p>Click on the image below to open the project</p>
      <a href={project.link} target="_blank">
        <Image
          src={`/img/${project.imgSrc}`}
          alt={project.alt}
          width={project.width}
          height={project.height}
          priority
        />
      </a>
    </Card>
  );
};

export default ProjectLayout;
