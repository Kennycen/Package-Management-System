import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

// Website information that will be used to train the AI
const websiteInfo = `
This package management website has the following features:

1. Package Tracking:
- Track packages through different statuses: Arrived, Notified, and Picked Up
- Each package includes details like recipient name, apartment number, carrier, and tracking number
- Package sizes are categorized as Small, Medium, Large, or Extra Large

2. Package Management:
- Add new packages with recipient details and tracking information
- View packages filtered by their current status
- Search packages by recipient name, tracking number, apartment, or carrier
- Filter packages by carrier (UPS, FedEx, USPS, Amazon, DHL) and size

3. Tenant Notifications:
- Automatic status updates when packages arrive
- Notification system for when tenants are informed about their packages
- Track when packages are picked up

4. User Interface:
- Dashboard view for managing all packages
- Search and filter functionality for easy package finding
- Clean, modern interface with status indicators
- Mobile-responsive design for access on any device

The website helps property managers and staff efficiently manage incoming packages and ensure proper delivery to tenants.
`;

// Initialize chat with detailed website context
const initializeChat = async () => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    history: [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant for our package management website. Here is the specific information about our website's features and functionality: ${websiteInfo} Please use this information to provide accurate, helpful, and concise answers about how our website works.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand that I'm a helpful assistant for your package management website. I'll use the provided information about your tracking system, package management features, tenant notifications, and user interface to answer questions accurately. How can I help you understand our features?",
          },
        ],
      },
    ],
  });
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ success: false, message: "Message is required" });
    }

    const chat = await initializeChat();
    const result = await chat.sendMessage({ message });
    const response = result.text;

    res.json({
      success: true,
      message: response,
      sender: "assistant",
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("Chat Error:", err.message);
    let userMessage = "Failed to process your message. Please try again.";
    if (err.status === 429) {
      userMessage = "Too many requests. Please wait a moment and try again.";
    }
    res.json({ success: false, message: userMessage });
  }
};
