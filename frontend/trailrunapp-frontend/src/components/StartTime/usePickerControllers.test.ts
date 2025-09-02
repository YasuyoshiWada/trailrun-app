import { renderHook, act } from '@testing-library/react';
import { useRowPickerController, useSinglePickerController } from './usePickerControllers';

describe('usePickerControllers onViewChange', () => {
  it('row: 時間->日付に戻れる', () => {
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

  it('single: 時間->日付に戻れる', () => {
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
