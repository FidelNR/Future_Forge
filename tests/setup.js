import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

window.ResizeObserver = ResizeObserver;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});