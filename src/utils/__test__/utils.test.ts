import { isAxiosError } from '@/utils/utils';
import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';

describe('isAxiosError', () => {
  it('should return true if error is an AxiosError else return flase', () => {
    // test code here
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});
