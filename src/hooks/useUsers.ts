import { useEffect, useMemo, useState } from "react";
import type { Role, User } from "../types";
import { fetchUsers } from "../api";

export interface Filters {
  role: Role | "All";
  search: string;
}

export interface UseUsersOptions {
  pageSize?: number;
}

export function useUsers({ pageSize = 5 }: UseUsersOptions = {}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ role: "All", search: "" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchUsers()
      .then(data => {
        if (!mounted) return;
        // runtime validation (minimal)
        setUsers(Array.isArray(data) ? (data as User[]) : []);
        setError(null);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Unknown error");
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = users;
    if (filters.role !== "All") {
      list = list.filter(u => u.role === filters.role);
    }
    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(u => u.name.toLowerCase().includes(q));
    }
    return list;
  }, [users, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function updateFilters(next: Partial<Filters>) {
    setPage(1);
    setFilters(f => ({ ...f, ...next }));
  }

  function selectUser(user: User | null) {
    setSelected(user);
  }

  return {
    users: paged,
    allUsersCount: users.length,
    filteredCount: filtered.length,
    loading,
    error,
    page,
    totalPages,
    setPage,
    filters,
    updateFilters,
    selected,
    selectUser
  };
}
