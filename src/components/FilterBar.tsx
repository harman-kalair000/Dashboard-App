import styles from "./FilterBar.module.css";
import { Role } from "../types";

interface Props {
  role: Role | "All";
  search: string;
  onChange: (update: Partial<{ role: Role | "All"; search: string }>) => void;
  onToggleTheme: () => void;
}

const roles: Array<Role | "All"> = ["All", "Admin", "Editor", "Viewer"];

export default function FilterBar({
  role,
  search,
  onChange,
  onToggleTheme
}: Props) {
  return (
    <div className={`card ${styles.bar}`}>
      <label>
        <span className="sr-only">Search by name</span>
        <input
          className="input"
          placeholder="Search by name…"
          value={search}
          onChange={e => onChange({ search: e.target.value })}
          aria-label="Search by name"
        />
      </label>
      <label>
        <span className="sr-only">Filter by role</span>
        <select
          className="select"
          value={role}
          onChange={e => onChange({ role: e.target.value as Role | "All" })}
          aria-label="Filter by role"
        >
          {roles.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.right}>
        <button
          className="btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          Theme
        </button>
      </div>
    </div>
  );
}
