import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userModel from "./userModel";

let mongoServer;

describe("User Model Schema", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it("should create a valid user", async () => {
    const user = await userModel.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345",
    });

    expect(user._id).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("johndoe@gmail.com");
  });

  it("should throw validation error if required fields are missing", async () => {
    try {
      await userModel.create({ email: "missing@example.com" });
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.name).toBeDefined();
      expect(err.errors.password).toBeDefined();
    }
  });

  it("should enforce unique email constraint", async () => {
    const baseData = {
      name: "Alice",
      email: "alice@example.com",
      password: "password1",
    };

    await userModel.create(baseData);

    await expect(userModel.create(baseData)).rejects.toThrowError(
      /duplicate key/
    );
  });
});
