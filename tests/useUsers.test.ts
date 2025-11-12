import { test, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useUsers } from "../src/hooks/useUsers";

// mock fetch
const mockData = [
  {
    id: 1,
    name: "Ada",
    email: "a@x.com",
    role: "Admin",
    status: "Active",
    avatar: ""
  },
  {
    id: 2,
    name: "Grace",
    email: "g@x.com",
    role: "Editor",
    status: "Active",
    avatar: ""
  },
  {
    id: 3,
    name: "Linus",
    email: "l@x.com",
    role: "Viewer",
    status: "Suspended",
    avatar: ""
  }
];

beforeEach(() => {
  // @ts-expect-error
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: async () => mockData })
  );
});

test("filters by role and search, paginates", async () => {
  const { result } = renderHook(() => useUsers({ pageSize: 2 }));

  await act(async () => {});

  expect(result.current.allUsersCount).toBe(3);
  expect(result.current.filteredCount).toBe(3);
  expect(result.current.users.length).toBe(2);

  act(() => result.current.updateFilters({ role: "Admin" }));
  expect(result.current.filteredCount).toBe(1);

  act(() => result.current.updateFilters({ role: "All", search: "li" }));
  expect(result.current.filteredCount).toBe(1);

  act(() => result.current.setPage(2));
  expect(result.current.page).toBe(2);
});
