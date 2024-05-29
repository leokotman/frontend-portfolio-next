import ProjectLayout from '@/app/_components/projectLayout/projectLayout';
import { GAMES } from '@/app/_lib/constants';

export default function Games() {
  return (
    <section className="flex flex-row gap-6 justify-center">
      {GAMES.map((game) => {
        return <ProjectLayout key={game.imgSrc} project={game} />;
      })}
    </section>
  );
}
