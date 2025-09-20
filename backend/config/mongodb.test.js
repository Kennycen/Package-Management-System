import { describe, it, expect, vi, beforeEach } from "vitest";
import mongoose from "mongoose";
import connectDB from "./mongodb";

vi.mock("mongoose", () => ({
  default: {
    connect: vi.fn(),
    connection: {
      on: vi.fn(),
    },
  },
}));

describe("connectDB", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call mongoose.connect with correct URI", async () => {
    process.env.MONGODB_URI = "mongodb://localhost:27017";
    mongoose.connect.mockResolvedValueOnce(true);

    await connectDB();

    expect(mongoose.connection.on).toHaveBeenCalledWith(
      "connected",
      expect.any(Function)
    );
    expect(mongoose.connection.on).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017"
    );
  });

  it("should exit process on connection error", async () => {
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("Process exited");
    });
    process.env.MONGODB_URI = "mongodb://localhost:27017";
    mongoose.connect.mockRejectedValueOnce(new Error("Failed to connect"));

    await expect(connectDB()).rejects.toThrow("Process exited");
    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });
});
