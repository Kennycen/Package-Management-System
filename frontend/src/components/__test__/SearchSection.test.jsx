import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SearchSection from '../SearchSection';

describe('SearchSection Component', () => {
  const mockOnSearch = vi.fn();
  const mockOnAddClick = vi.fn();
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <SearchSection 
        onSearch={mockOnSearch} 
        onAddClick={mockOnAddClick} 
        onFilterChange={mockOnFilterChange} 
      />
    );
  };

  test('renders input field, filter button, and add package button', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Search by name or tracking number...')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('Add New Package')).toBeInTheDocument();
  });

  test('calls onSearch when typing in the search input', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Search by name or tracking number...');
    fireEvent.change(searchInput, { target: { value: '12345' } });

    expect(mockOnSearch).toHaveBeenCalledWith('12345');
  });

  test('calls onAddClick when "Add New Package" button is clicked', () => {
    renderComponent();

    const addButton = screen.getByText('Add New Package');
    fireEvent.click(addButton);

    expect(mockOnAddClick).toHaveBeenCalled();
  });

  test('shows filter options when filter button is clicked', () => {
    renderComponent();

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    expect(screen.getByText('Carrier')).toBeInTheDocument();
    expect(screen.getByText('Package Size')).toBeInTheDocument();
  });

  test('updates filters and calls onFilterChange when selecting options', () => {
    renderComponent();

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    const carrierLabel = screen.getByText('Carrier');
    const carrierSelect = carrierLabel.nextElementSibling;
    fireEvent.change(carrierSelect, { target: { value: 'UPS' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ carrier: 'UPS', size: '' });

    const sizeLabel = screen.getByText('Package Size');
    const sizeSelect = sizeLabel.nextElementSibling;
    fireEvent.change(sizeSelect, { target: { value: 'Large' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ carrier: 'UPS', size: 'Large' });
  });

  test('clears filters when "Clear filters" button is clicked', () => {
    renderComponent();

    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);

    const carrierLabel = screen.getByText('Carrier');
    const carrierSelect = carrierLabel.nextElementSibling;
    fireEvent.change(carrierSelect, { target: { value: 'FedEx' } });

    const clearFiltersButton = screen.getByText('Clear filters');
    fireEvent.click(clearFiltersButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({ carrier: '', size: '' });
  });
});