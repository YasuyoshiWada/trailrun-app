import { render, screen, waitFor } from '@testing-library/react';
import StatusLegend from '../StatusLegend';

describe('StatusLegend', () => {
  const  mockStatuses = [
    { label: '未受付', color: '#A7A5A6', iconName: 'HelpOutline' },
    { label: '受付済み', color: '#66ccce', iconName: 'PersonAddAlt1' },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders statuses returned from the API', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockStatuses,
    });

    render(<StatusLegend />);

    expect(screen.getByText('ステータスを読み込み中です…')).toBeInTheDocument();

    expect(await screen.findByText('未受付')).toBeInTheDocument();
    expect(screen.getByText('受付済み')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/statuses');
  });

  it('shows an error message when the request fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error',
    });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<StatusLegend />);

    expect(await screen.findByText('ステータスの取得に失敗しました')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('shows an error message when the response format is invalid', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ invalid: true }),
    });
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<StatusLegend />);

    await waitFor(() => {
      expect(screen.getByText('ステータスの取得に失敗しました')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
