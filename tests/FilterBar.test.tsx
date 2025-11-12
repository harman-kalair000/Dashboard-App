import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../src/components/FilterBar";
import { expect, test, vi } from "vitest";

test("updates search and role", () => {
  const onChange = vi.fn();
  const onToggleTheme = vi.fn();
  render(
    <FilterBar
      role="All"
      search=""
      onChange={onChange}
      onToggleTheme={onToggleTheme}
    />
  );

  const input = screen.getByRole("textbox", { name: /search by name/i });
  fireEvent.change(input, { target: { value: "ada" } });
  expect(onChange).toHaveBeenCalledWith({ search: "ada" });

  const select = screen.getByRole("combobox", { name: /filter by role/i });
  fireEvent.change(select, { target: { value: "Admin" } });
  expect(onChange).toHaveBeenCalledWith({ role: "Admin" });
});
