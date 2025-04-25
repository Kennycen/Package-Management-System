import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import packageModel from "./packageModel";

let mongoServer;

describe("Package Model Schema", () => {
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
    await packageModel.deleteMany({});
  });

  it("should create a valid package", async () => {
    const now = new Date();

    const pkg = await packageModel.create({
      trackingNumber: "XYZ123456",
      recipient: "Alice",
      email: "alice@example.com",
      apartment: "5B",
      carrier: "UPS",
      size: "Medium",
      arrivalDate: now,
      userId: new mongoose.Types.ObjectId(),
    });

    expect(pkg._id).toBeDefined();
    expect(pkg.status).toBe("arrived"); // default
    expect(pkg.description).toBe("Description of the package"); // default
    expect(pkg.trackingNumber).toBe("XYZ123456");
  });

  it("should fail without required fields", async () => {
    try {
      await packageModel.create({
        recipient: "Bob",
        email: "bob@example.com",
        // missing trackingNumber, apartment, carrier, size, arrivalDate
      });
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.trackingNumber).toBeDefined();
    }
  });

  it("should not allow duplicate tracking numbers", async () => {
    const now = new Date();

    const baseData = {
      trackingNumber: "DUPETRACK123",
      recipient: "Tester",
      email: "test@example.com",
      apartment: "8A",
      carrier: "FedEx",
      size: "Large",
      arrivalDate: now,
      userId: new mongoose.Types.ObjectId(),
    };

    await packageModel.create(baseData);

    await expect(packageModel.create(baseData)).rejects.toThrowError();
  });

  it("should only allow valid enum values for status", async () => {
    const now = new Date();

    const invalid = new packageModel({
      trackingNumber: "ENUM123",
      recipient: "Enum Guy",
      email: "enum@example.com",
      apartment: "7Z",
      carrier: "USPS",
      size: "Small",
      arrivalDate: now,
      userId: new mongoose.Types.ObjectId(),
      status: "delivered",
    });

    try {
      await invalid.validate();
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.status).toBeDefined();
    }
  });
});
