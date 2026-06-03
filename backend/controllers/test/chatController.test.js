import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockSendMessage, mockChatsCreate } = vi.hoisted(() => {
  const mockSendMessage = vi.fn().mockResolvedValue({
    text: "Mock Gemini AI response.",
  });
  const mockChatsCreate = vi.fn().mockResolvedValue({
    sendMessage: mockSendMessage,
  });
  return { mockSendMessage, mockChatsCreate };
});

vi.mock("@google/genai", () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    chats: {
      create: mockChatsCreate,
    },
  })),
}));

import { sendMessage } from "../chatController.js";

describe("sendMessage (unit test)", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: vi.fn(),
    };
    vi.clearAllMocks();
    mockSendMessage.mockResolvedValue({
      text: "Mock Gemini AI response.",
    });
    mockChatsCreate.mockResolvedValue({
      sendMessage: mockSendMessage,
    });
  });

  it("should return error when message is missing", async () => {
    await sendMessage(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Message is required",
    });
  });

  it("should return AI response when message is provided", async () => {
    req.body.message = "How does package tracking work?";

    await sendMessage(req, res);

    expect(mockChatsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "gemini-2.5-flash",
        history: expect.any(Array),
      })
    );
    expect(mockSendMessage).toHaveBeenCalledWith({
      message: "How does package tracking work?",
    });
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Mock Gemini AI response.",
      sender: "assistant",
    });
  });
});
