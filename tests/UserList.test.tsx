import { render, screen } from "@testing-library/react";
import UserList from "../src/components/UserList";
import type { User } from "../src/types";
import { expect, test } from "vitest";

const users: User[] = [
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
  }
];

test("renders user items", () => {
  render(
    <UserList
      users={users}
      total={2}
      filteredTotal={2}
      page={1}
      totalPages={1}
      setPage={() => {}}
      onSelect={() => {}}
      loading={false}
      error={null}
    />
  );
  expect(screen.getByRole("list", { name: /users/i })).toBeInTheDocument();
  expect(screen.getByText("Ada")).toBeInTheDocument();
  expect(screen.getByText("Grace")).toBeInTheDocument();
});
