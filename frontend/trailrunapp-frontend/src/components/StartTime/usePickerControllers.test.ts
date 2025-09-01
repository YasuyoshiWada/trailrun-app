import { renderHook, act } from '@testing-library/react';
import { useRowPickerController, useSinglePickerController } from './usePickerControllers';

describe('usePickerControllers onViewChange', () => {
  it('returns to day view when calendar icon clicked in row controller', () => {
    const { result } = renderHook(() => useRowPickerController());
    act(() => {
      result.current.onViewChange('hours');
    });
    expect(result.current.view).toBe('hours');
    act(() => {
      result.current.onViewChange('day');
    });
    expect(result.current.view).toBe('day');
  });

  it('returns to day view when calendar icon clicked in single controller', () => {
    const { result } = renderHook(() => useSinglePickerController());
    act(() => {
      result.current.onViewChange('minutes');
    });
    expect(result.current.view).toBe('minutes');
    act(() => {
      result.current.onViewChange('day');
    });
    expect(result.current.view).toBe('day');
  });
});
