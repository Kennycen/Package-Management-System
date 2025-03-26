import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from "react-router-dom";
import DashboardNavbar from "../DashboardNavbar";
import { AppContext } from "../../context/AppContext";

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Package: () => <div data-testid="package-icon">Package</div>,
  Settings: () => <div data-testid="settings-icon">Settings</div>,
  LogOut: () => <div data-testid="logout-icon">Logout</div>,
  User: () => <div data-testid="user-icon">User</div>
}));

describe("DashboardNavbar Component", () => {
  const mockSetUser = vi.fn();
  const mockSetToken = vi.fn();
  const mockUser = {
    name: "Test User",
    email: "test@example.com"
  };

  const renderWithContext = () => {
    return render(
      <AppContext.Provider value={{ 
        setUser: mockSetUser, 
        setToken: mockSetToken,
        user: mockUser
      }}>
        <BrowserRouter>
          <DashboardNavbar />
        </BrowserRouter>
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders navbar with title", () => {
    renderWithContext();
    expect(screen.getByText("PackageDesk")).toBeInTheDocument();
    expect(screen.getByTestId("package-icon")).toBeInTheDocument();
  });

  test("toggles settings dropdown on profile icon click", async () => {
    renderWithContext();
    const profileIcon = screen.getByRole('presentation');
    
    // Click profile icon to open dropdown
    await userEvent.click(profileIcon);
    expect(screen.getByText("My Account")).toBeInTheDocument();

    // Click outside to close dropdown
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("My Account")).not.toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", async () => {
    renderWithContext();
    const profileIcon = screen.getByRole('presentation');

    // Open dropdown
    await userEvent.click(profileIcon);
    
    // Find the logout button using role and text
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    // Click logout button
    await userEvent.click(logoutButton);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(mockSetToken).toHaveBeenCalledWith(null);
  });
});