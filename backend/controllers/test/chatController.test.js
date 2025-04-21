import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessage } from "../chatController"; 

// Mock Gemini SDK
vi.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        startChat: vi.fn().mockResolvedValue({
          sendMessage: vi.fn().mockResolvedValue({
            response: {
              text: async () => "Mock Gemini AI response.",
            },
          }),
        }),
      }),
    })),
  };
});

describe("sendMessage (unit test)", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: vi.fn(),
    };
    vi.clearAllMocks();
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

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Mock Gemini AI response.",
      sender: "assistant",
    });
  });
});
