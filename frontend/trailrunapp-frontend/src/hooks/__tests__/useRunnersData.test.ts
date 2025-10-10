import { renderHook, act, waitFor } from '@testing-library/react';
import { allRunners } from '../../data/all_Runners';
import { useRunnersData } from '../useRunnersData';

//jest.fn()はJestが提供するモック関数を作るためのヘルパーです。何を返すかわからない汎用モック関数です。
const mockFetch = jest.fn();
//mockFetch as unknown
//→ まず一旦 「型を unknown（＝なんでもOK）」に変換して、型チェックを中断。as typeof fetch
//→ 次にそれを fetch と同じ型として扱う。
global.fetch = mockFetch as unknown as typeof fetch;

jest.mock("../../api/runners", () => ({
  fetchRunners: jest.fn(),
}));

type FetchRunnersModule = typeof import("../../api/runners");

const { fetchRunners } = jest.requireMock("../../api/runners") as FetchRunnersModule;
const mockedFetchRunners = fetchRunners as jest.MockedFunction<FetchRunnersModule ["fetchRunners"]>;

describe ("useRunnersData", () => {
  beforeEach(() => {
    mockedFetchRunners.mockResolvedValue({ data: allRunners, error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches runners on mount", async () => {
    const { result } = renderHook(() => useRunnersData());

    expect(mockedFetchRunners).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(allRunners);
    expect(result.current.error).toBeNull();
  });

  it("refetches runners when refresh is called", async () => {
    const { result } = renderHook(() => useRunnersData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    mockedFetchRunners.mockResolvedValueOnce({ data: allRunners, error: null });

    await act(async () => {
      await result.current.refresh();
    });

    expect(mockedFetchRunners).toHaveBeenCalledTimes(2);
  });
});
