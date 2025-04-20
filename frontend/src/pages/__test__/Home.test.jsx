import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Home from '../Home';

// Mock IntersectionObserver
class IntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

describe('Home Component', () => {
  const mockContextValue = {
    setShowLogin: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <Home />
        </AppContext.Provider>
      </BrowserRouter>
    );
  };

  test('renders all main sections', () => {
    renderComponent();

    // Check for Navbar elements
    expect(screen.getByText('PackageDesk')).toBeInTheDocument();
    
    // Check for Login buttons in both desktop and mobile navigation
    const loginButtons = screen.getAllByText('Login');
    expect(loginButtons).toHaveLength(2);
    expect(loginButtons[0].closest('.hidden.md\\:block')).toBeInTheDocument(); // Desktop
    expect(loginButtons[1].closest('.md\\:hidden')).toBeInTheDocument(); // Mobile

    // Check for Hero section elements
    expect(screen.getByText('Streamline Package Management for Your Building')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();

    // Check for Feature section elements
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Everything You Need to Manage Packages')).toBeInTheDocument();

    // Check for About section elements
    expect(screen.getByText('Who are we?')).toBeInTheDocument();
    expect(screen.getByText('Your solution for package management system')).toBeInTheDocument();

    // Check for Demo section elements
    expect(screen.getByText('Check our Demo')).toBeInTheDocument();
    expect(screen.getByText('User friendly interface and sleek professional design')).toBeInTheDocument();

    // Check for FAQ section elements
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Common questions about our package management system')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderComponent();

    // Check that we have exactly 2 instances of each navigation link (desktop and mobile)
    const featureLinks = screen.getAllByText('Feature');
    const aboutLinks = screen.getAllByText('About');
    const demoLinks = screen.getAllByText('Demo');

    expect(featureLinks).toHaveLength(2);
    expect(aboutLinks).toHaveLength(2);
    expect(demoLinks).toHaveLength(2);

    // Verify that one set of links is in the desktop navigation
    expect(featureLinks[0].closest('.hidden.md\\:block')).toBeInTheDocument();
    expect(aboutLinks[0].closest('.hidden.md\\:block')).toBeInTheDocument();
    expect(demoLinks[0].closest('.hidden.md\\:block')).toBeInTheDocument();

    // Verify that one set of links is in the mobile navigation
    expect(featureLinks[1].closest('.md\\:hidden')).toBeInTheDocument();
    expect(aboutLinks[1].closest('.md\\:hidden')).toBeInTheDocument();
    expect(demoLinks[1].closest('.md\\:hidden')).toBeInTheDocument();
  });
}); 