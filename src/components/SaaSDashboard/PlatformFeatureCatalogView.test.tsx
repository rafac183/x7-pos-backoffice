import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PlatformFeatureCatalogView } from './PlatformFeatureCatalogView';
import { saasService } from '../../services/saasService';
import type { PlatformFeature } from '../../types/subscription';

vi.mock('../../services/saasService', () => ({
  saasService: {
    getFeatures: vi.fn(),
  },
}));

const MOCK_FEATURES: PlatformFeature[] = [
  {
    id: 1,
    name: 'Advanced Analytics',
    description: 'Provides advanced data analytics capabilities.',
    Unit: 'user',
    status: 'active',
  },
  {
    id: 2,
    name: 'Cloud Storage',
    description: 'Persistent file storage for merchant documents.',
    Unit: 'gb',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'API Access',
    description: 'Programmatic access via REST endpoints.',
    Unit: 'unit',
    status: 'active',
  },
];

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('PlatformFeatureCatalogView — loading state', () => {
  it('shows a loading indicator while fetching', () => {
    vi.mocked(saasService.getFeatures).mockReturnValue(new Promise(() => {}));
    render(<PlatformFeatureCatalogView />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

describe('PlatformFeatureCatalogView — error state', () => {
  it('shows an error message when the API call fails', async () => {
    vi.mocked(saasService.getFeatures).mockRejectedValue(new Error('Network error'));
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe('PlatformFeatureCatalogView — table rendering', () => {
  beforeEach(() => {
    vi.mocked(saasService.getFeatures).mockResolvedValue(MOCK_FEATURES);
  });

  it('renders the table title PLATFORM FEATURE CATALOG MASTER', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.getByText('PLATFORM FEATURE CATALOG MASTER')).toBeInTheDocument();
    });
  });

  it('renders feature names as primary bold text', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.getByText('Advanced Analytics')).toBeInTheDocument();
      expect(screen.getByText('Cloud Storage')).toBeInTheDocument();
      expect(screen.getByText('API Access')).toBeInTheDocument();
    });
  });

  it('renders monospace feature_{id} code labels below each name', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.getByText('feature_1')).toBeInTheDocument();
      expect(screen.getByText('feature_2')).toBeInTheDocument();
      expect(screen.getByText('feature_3')).toBeInTheDocument();
    });
  });

  it('renders feature descriptions as muted subtitle text', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.getByText('Provides advanced data analytics capabilities.')).toBeInTheDocument();
    });
  });

  it('renders Unit as a lowercase bracketed tag', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.getByText('[user]')).toBeInTheDocument();
      expect(screen.getByText('[gb]')).toBeInTheDocument();
      expect(screen.getByText('[unit]')).toBeInTheDocument();
    });
  });

  it('renders an emerald badge for active features', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      const activeBadges = screen.getAllByText('active');
      expect(activeBadges.length).toBeGreaterThan(0);
      expect(activeBadges[0]).toHaveClass('bg-emerald-500');
    });
  });

  it('renders a charcoal badge for inactive features', async () => {
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      const inactiveBadge = screen.getByText('inactive');
      expect(inactiveBadge).toHaveClass('bg-[#444444]');
    });
  });
});

describe('PlatformFeatureCatalogView — empty state', () => {
  it('renders the empty-state message when no features are returned', async () => {
    vi.mocked(saasService.getFeatures).mockResolvedValue([]);
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(
        screen.getByText(
          "No feature definitions found. Click 'Create Feature' to establish your first system capability flag.",
        ),
      ).toBeInTheDocument();
    });
  });

  it('does not render the table title in the empty state', async () => {
    vi.mocked(saasService.getFeatures).mockResolvedValue([]);
    render(<PlatformFeatureCatalogView />);
    await waitFor(() => {
      expect(screen.queryByText('PLATFORM FEATURE CATALOG MASTER')).not.toBeInTheDocument();
    });
  });
});
