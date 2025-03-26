import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom/vitest';
import Chatbot from "../Chatbot";

// Mock chat service API
vi.mock("../../services/chatApi", () => ({
  chatService: {
    sendMessage: vi.fn().mockResolvedValue({ success: true, message: "Hello! How can I help?" }),
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  BotMessageSquare: () => <div data-testid="bot-icon">BotIcon</div>,
  X: () => <div data-testid="close-icon">X</div>,
  Send: () => <div data-testid="send-icon">Send</div>
}));

describe("Chatbot Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders chatbot toggle button initially", () => {
    render(<Chatbot />);
    const button = screen.getByTestId("bot-icon").closest('button');
    expect(button).toBeInTheDocument();
  });

  test("opens chat when toggle button is clicked", async () => {
    render(<Chatbot />);
    const toggleButton = screen.getByTestId("bot-icon").closest('button');
    await userEvent.click(toggleButton);
    expect(screen.getByText("Package Assistant")).toBeInTheDocument();
  });

  test("closes chat when close button is clicked", async () => {
    render(<Chatbot />);
    // Open chat first
    const toggleButton = screen.getByTestId("bot-icon").closest('button');
    await userEvent.click(toggleButton);

    // Find and click close button
    const closeButton = screen.getByTestId("close-icon").closest('button');
    await userEvent.click(closeButton);

    expect(screen.queryByText("Package Assistant")).not.toBeInTheDocument();
  });

  test("sends message and displays response", async () => {
    render(<Chatbot />);
    
    // Open chat
    const toggleButton = screen.getByTestId("bot-icon").closest('button');
    await userEvent.click(toggleButton);

    // Find input and send button
    const input = screen.getByPlaceholderText(/ask about our website/i);
    const sendButton = screen.getByTestId("send-icon").closest('button');

    // Type and send message
    await userEvent.type(input, "Hello");
    await userEvent.click(sendButton);

    // Verify message appears and response is shown
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(await screen.findByText("Hello! How can I help?")).toBeInTheDocument();
  });
});