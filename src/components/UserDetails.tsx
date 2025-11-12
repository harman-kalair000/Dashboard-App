import styles from "./UserDetails.module.css";
import { User } from "../types";

export default function UserDetails({ user }: { user: User }) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.avatar} src={user.avatar} alt="" />
      <div>
        <div className={styles.field}>
          <span className={styles.label}>Name</span>
          <div className={styles.value}>{user.name}</div>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <div className={styles.value}>{user.email}</div>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Role</span>
          <div className={styles.value}>{user.role}</div>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Status</span>
          <div className={styles.value}>{user.status}</div>
        </div>
      </div>
    </div>
  );
}
