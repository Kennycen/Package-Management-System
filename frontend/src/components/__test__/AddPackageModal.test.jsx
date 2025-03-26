import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPackageModal from "../AddPackageModal";
import { packageService } from '../../services/packageApi';
import { describe, test, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('lucide-react', () => ({
  X: () => 'X',
}));

describe("AddPackageModal Component", () => {
  const mockOnClose = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(packageService, 'addPackage').mockImplementation(() => Promise.resolve({ success: true }));
  });

  test("renders modal when isOpen is true", () => {
    render(<AddPackageModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText("Add New Package")).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    render(<AddPackageModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText("Add New Package")).not.toBeInTheDocument();
  });

  test("closes modal when clicking close button", async () => {
    render(<AddPackageModal isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: 'X' });
    await userEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("submits form with correct data", async () => {
    render(<AddPackageModal isOpen={true} onClose={mockOnClose} />);
    
    // Fill in the form
    await userEvent.type(screen.getByLabelText(/tracking number/i), "123456789");
    await userEvent.selectOptions(screen.getByLabelText(/carrier/i), "UPS");
    await userEvent.type(screen.getByLabelText(/recipient name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/recipient email/i), "john@example.com");
    await userEvent.type(screen.getByLabelText(/apartment number/i), "A123");
    await userEvent.selectOptions(screen.getByLabelText(/package size/i), "Medium");
    await userEvent.type(screen.getByLabelText(/description/i), "Test package");

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /add package/i });
    await userEvent.click(submitButton);

    // Verify the service was called with correct data
    expect(packageService.addPackage).toHaveBeenCalledWith({
      trackingNumber: "123456789",
      carrier: "UPS",
      recipient: "John Doe",
      email: "john@example.com",
      apartment: "A123",
      size: "Medium",
      description: "Test package",
    });
  });
});
