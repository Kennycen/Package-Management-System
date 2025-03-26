import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import PackageList from '../PackageList';
import { packageService } from '../../services/packageApi';
import { ToastContainer } from 'react-toastify';

vi.mock('../../services/packageApi', () => ({
  packageService: {
    getPackagesByStatus: vi.fn(),
  },
}));

describe('PackageList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading state', () => {
    packageService.getPackagesByStatus.mockResolvedValue({ success: true, packages: [] });
    render(<PackageList activeStatus="arrived" refreshTrigger={0} />);
    expect(screen.getByText('Loading packages...')).toBeInTheDocument();
  });

  test('displays no packages message', async () => {
    packageService.getPackagesByStatus.mockResolvedValue({ success: true, packages: [] });
    render(<PackageList activeStatus="arrived" refreshTrigger={0} />);
    await waitFor(() => {
      expect(screen.getByText('No packages found in arrived status')).toBeInTheDocument();
    });
  });

  test('renders package cards when packages are available', async () => {
    const mockPackages = [
      { _id: '1', recipient: 'John Doe', trackingNumber: '12345', apartment: '1A', carrier: 'UPS', size: 'Medium' },
      { _id: '2', recipient: 'Jane Smith', trackingNumber: '67890', apartment: '2B', carrier: 'FedEx', size: 'Large' }
    ];
    packageService.getPackagesByStatus.mockResolvedValue({ success: true, packages: mockPackages });
    render(<PackageList activeStatus="arrived" refreshTrigger={0} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
