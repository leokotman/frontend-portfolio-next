import styles from './chip.module.scss';

interface ChipParams {
  text: string;
}

export function Chip(props: ChipParams) {
  const { text } = props;
  return <div className={styles.chip}>{text}</div>;
}
