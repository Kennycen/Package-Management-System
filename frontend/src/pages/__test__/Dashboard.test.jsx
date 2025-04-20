import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  const mockContextValue = { activeStatus: 'Arrived' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <Dashboard />
        </AppContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders the dashboard with key components', () => {
    renderComponent();

    expect(screen.getByText('Package Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Manage incoming packages and tenant notifications')).toBeInTheDocument();
    expect(screen.getByText('Add New Package')).toBeInTheDocument();
  });

  test('opens the Add Package modal when the button is clicked', () => {
    renderComponent();

    const addButton = screen.getByText('Add New Package');
    fireEvent.click(addButton);

    expect(screen.getByText('Add Package')).toBeInTheDocument(); // Assuming modal has a title "Add Package"
  });

  test('updates search query when typing in the search box', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Search by name or tracking number...');
    fireEvent.change(searchInput, { target: { value: 'Tracking123' } });

    expect(searchInput.value).toBe('Tracking123');
  });

  test('applies filters when selecting filter options', () => {
    renderComponent();

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    const carrierLabel = screen.getByText('Carrier');
    const carrierSelect = carrierLabel.nextElementSibling;
    fireEvent.change(carrierSelect, { target: { value: 'FedEx' } });

    expect(carrierSelect.value).toBe('FedEx');
  });
});