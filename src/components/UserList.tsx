import styles from "./UserList.module.css";
import UserRow from "./UserRow";
import { User } from "../types";

interface Props {
  users: User[];
  total: number;
  filteredTotal: number;
  page: number;
  totalPages: number;
  setPage: (n: number) => void;
  onSelect: (u: User) => void;
  loading: boolean;
  error: string | null;
}

export default function UserList({
  users,
  total,
  filteredTotal,
  page,
  totalPages,
  setPage,
  onSelect,
  loading,
  error
}: Props) {
  return (
    <div className={`card ${styles.list}`}>
      {loading && (
        <div role="status" aria-live="polite" className="p-3">
          Loading users…
        </div>
      )}
      {error && (
        <div role="alert" className="p-3">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <ul className={styles.ul} aria-label="Users">
            {users.map(u => (
              <UserRow key={u.id} user={u} onClick={onSelect} />
            ))}
            {users.length === 0 && (
              <li className="p-3">No users match current filters.</li>
            )}
          </ul>
          <div className={styles.footer}>
            <div className={styles.badge}>
              {filteredTotal} of {total}
            </div>
            <div className={styles.pager}>
              <button
                className="btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                aria-label="Previous page"
              >
                Prev
              </button>
              <span>
                Page {page} / {totalPages}
              </span>
              <button
                className="btn"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
