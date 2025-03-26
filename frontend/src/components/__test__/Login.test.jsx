import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import { AppContext } from "../../context/AppContext";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

describe("Login Component", () => {
  const mockSetShowLogin = vi.fn();
  const mockSetToken = vi.fn();
  const mockSetUser = vi.fn();
  const backendUrl = "http://localhost:5000"; // Mock backend URL

  test("renders login form correctly", () => {
    render(
      <AppContext.Provider value={{ setShowLogin: mockSetShowLogin, backendUrl, setToken: mockSetToken, setUser: mockSetUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AppContext.Provider>
    );

    // Check if login heading is present
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    
    // Check if input fields are present
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Check if login button is present
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test("updates input fields correctly", () => {
    render(
      <AppContext.Provider value={{ setShowLogin: mockSetShowLogin, backendUrl, setToken: mockSetToken, setUser: mockSetUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AppContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("switches to Sign Up mode", () => {
    render(
      <AppContext.Provider value={{ setShowLogin: mockSetShowLogin, backendUrl, setToken: mockSetToken, setUser: mockSetUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AppContext.Provider>
    );

    const signUpLink = screen.getByText("Sign up");
    fireEvent.click(signUpLink);

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
  });
});