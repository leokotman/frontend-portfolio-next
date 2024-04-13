import Image from 'next/image';

export default function Games() {
  return (
    <div>
      Games
      <a
        href="https://leokotman.github.io/monster-game/"
        target="_blank"
        title="Beat the monster"
      >
        <Image
          src="/img/game-monster.png"
          alt="monster-game"
          height="400"
          width="400"
        />
      </a>
      <a
        href="https://leokotman.github.io/doodle-jump/"
        target="_blank"
        title="Doodle jump"
      >
        <Image
          src="/img/game-jump.png"
          alt="jump-game"
          height="400"
          width="400"
        />
      </a>
    </div>
  );
}
