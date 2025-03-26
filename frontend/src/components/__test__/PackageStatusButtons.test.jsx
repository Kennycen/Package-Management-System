import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import PackageStatusButtons from '../PackageStatusButtons';
import { AppContext } from '../../context/AppContext';

vi.mock('../../services/packageApi', () => ({
  packageService: {
    getPackagesByStatus: vi.fn().mockResolvedValue({ packages: [] })
  }
}));

describe('PackageStatusButtons Component', () => {
  const mockSetActiveStatus = vi.fn();

  const renderComponent = (activeStatus = 'arrived') => {
    return render(
      <AppContext.Provider value={{ activeStatus, setActiveStatus: mockSetActiveStatus }}>
        <PackageStatusButtons />
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all status buttons', () => {
    renderComponent();
    expect(screen.getByText('Arrived')).toBeInTheDocument();
    expect(screen.getByText('Notified')).toBeInTheDocument();
    expect(screen.getByText('Picked Up')).toBeInTheDocument();
  });

  test('calls setActiveStatus when clicking status buttons', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Notified'));
    expect(mockSetActiveStatus).toHaveBeenCalledWith('notified');

    fireEvent.click(screen.getByText('Picked Up'));
    expect(mockSetActiveStatus).toHaveBeenCalledWith('picked');

    fireEvent.click(screen.getByText('Arrived'));
    expect(mockSetActiveStatus).toHaveBeenCalledWith('arrived');
  });

  test('highlights the active status button', () => {
    renderComponent('notified');
    const notifiedButton = screen.getByText('Notified').closest('button');
    expect(notifiedButton).toHaveClass('text-blue-600');
  });
});