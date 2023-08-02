import styles from "./ListRow.module.css";

const ListCell = ({ children, onClick, id }) => {
  return <tr onClick = {() => onClick(id)} className={styles.cell}>{children}</tr>;
};

export default ListCell;
