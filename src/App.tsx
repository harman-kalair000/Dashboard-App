import { useEffect } from "react";
import FilterBar from "./components/FilterBar";
import UserList from "./components/UserList";
import Modal from "./components/Modal";
import UserDetails from "./components/UserDetails";
import { useUsers } from "./hooks/useUsers";

export default function App() {
  const {
    users,
    allUsersCount,
    filteredCount,
    loading,
    error,
    page,
    totalPages,
    setPage,
    filters,
    updateFilters,
    selected,
    selectUser
  } = useUsers({ pageSize: 4 });

  useEffect(() => {
    const root = document.documentElement;
    if (!root.getAttribute("data-theme"))
      root.setAttribute("data-theme", "dark");
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    root.setAttribute(
      "data-theme",
      root.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
  }

  return (
    <main className="container">
      <header className="header">
        <h1>User Dashboard</h1>
      </header>

      <FilterBar
        role={filters.role}
        search={filters.search}
        onChange={updateFilters}
        onToggleTheme={toggleTheme}
      />

      <div className="grid">
        <UserList
          users={users}
          total={allUsersCount}
          filteredTotal={filteredCount}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onSelect={selectUser}
          loading={loading}
          error={error}
        />

        <aside
          className="card"
          aria-label="Detail panel"
          style={{ padding: "1rem" }}
        >
          {selected ? (
            <UserDetails user={selected} />
          ) : (
            <p>Select a user to see details.</p>
          )}
        </aside>
      </div>

      {/* Also provide a modal detail for mobile */}
      <Modal
        title={selected ? selected.name : "User details"}
        open={!!selected}
        onClose={() => selectUser(null)}
      >
        {selected && <UserDetails user={selected} />}
      </Modal>
    </main>
  );
}
