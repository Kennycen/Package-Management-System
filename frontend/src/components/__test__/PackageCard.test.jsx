import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import '@testing-library/jest-dom';
import PackageCard from "../PackageCard";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { packageService } from "../../services/packageApi";

vi.mock("react-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("../../services/packageApi", () => ({
  packageService: {
    updatePackageStatus: vi.fn().mockResolvedValue({ success: true }),
    deletePackage: vi.fn().mockResolvedValue({ success: true })
  }
}));

const mockOnStatusChange = vi.fn();

const mockPkg = {
  _id: "123",
  recipient: "John Doe",
  apartment: "A1",
  carrier: "UPS",
  description: "A package containing books",
  trackingNumber: "1Z999AA10123456784",
  arrivalDate: "2025-03-22T00:00:00.000Z",
  notificationDate: "2025-03-23T00:00:00.000Z",
  pickupDate: "2025-03-24T00:00:00.000Z",
  size: "Medium",
};

describe("PackageCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders package details correctly", () => {
    render(<PackageCard pkg={mockPkg} activeStatus="arrived" onStatusChange={mockOnStatusChange} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Apt A1 - UPS")).toBeInTheDocument();
    expect(screen.getByText("A package containing books")).toBeInTheDocument();
    expect(screen.getByText("1Z999AA10123456784")).toBeInTheDocument();
    expect(screen.getByText("Notify Tenant")).toBeInTheDocument();
  });

  test("calls onStatusChange when clicking status change button", async () => {
    render(<PackageCard pkg={mockPkg} activeStatus="arrived" onStatusChange={mockOnStatusChange} />);

    const button = screen.getByText("Notify Tenant");
    await fireEvent.click(button);

    expect(packageService.updatePackageStatus).toHaveBeenCalledWith(mockPkg._id, "notified");
    expect(toast.success).toHaveBeenCalledWith("Package notification sent");
    expect(mockOnStatusChange).toHaveBeenCalled();
  });
});
