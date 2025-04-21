import { describe, it, expect, vi, beforeEach } from "vitest";
import { authenticateUser } from "./auth"; 
import jwt from "jsonwebtoken";

vi.mock("jsonwebtoken");

describe("authenticateUser middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer validtoken",
      },
    };
    res = {
      json: vi.fn(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  it("should authenticate and call next() with valid token", async () => {
    jwt.verify.mockReturnValueOnce({ id: "user123" });

    await authenticateUser(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(
      "validtoken",
      process.env.JWT_SECRET
    );
    expect(req.user).toEqual({ id: "user123" });
    expect(next).toHaveBeenCalled();
  });

  it("should return error if token is missing", async () => {
    req.headers.authorization = null;

    await authenticateUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No token provided",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return error if token is invalid", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authenticateUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
