import styles from './chip.module.scss';

interface ChipParams {
  text: string;
}

export function Chip(props: ChipParams) {
  const { text } = props;
  return <span className={styles.chip}>{text}</span>;
}
