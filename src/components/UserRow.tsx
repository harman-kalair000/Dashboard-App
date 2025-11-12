import styles from "./UserRow.module.css";
import { User } from "../types";

interface Props {
  user: User;
  onClick: (user: User) => void;
}

export default function UserRow({ user, onClick }: Props) {
  return (
    <li
      className={styles.row}
      onClick={() => onClick(user)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick(user)}
      aria-label={`Open details for ${user.name}`}
    >
      <img className={styles.avatar} src={user.avatar} alt="" />
      <div>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.email}>{user.email}</div>
      </div>
      <div className={styles.role}>{user.role}</div>
    </li>
  );
}
