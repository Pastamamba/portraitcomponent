# Improvement Areas

This document outlines identified improvement areas for the Portrait Component, organized by priority and category.

---

## High Priority

### 1. Testing Infrastructure
**Status:** Not implemented  
**Impact:** High — no automated tests exist, making refactoring and contributions risky.

- Add [Vitest](https://vitest.dev/) as the test runner (aligns with Vite build tool).
- Add [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component tests.
- Write unit tests for utility functions and constants.
- Write integration tests for ImageSlider drag/scroll behavior.
- Add snapshot tests for component rendering.

### 2. State Management Complexity
**Status:** Identified  
**Impact:** High — `ImageSlider.tsx` manages 13+ state variables, making it hard to maintain.

- Consolidate related state into a `useReducer` (e.g., drag state: `isDragging`, `startPosition`, `distanceMoved`, `isMouseDown`, `startX`).
- Extract scroll state into a dedicated `useScrollNavigation` hook.
- Extract drag state into a dedicated `useDragNavigation` hook.

### 3. Error Handling
**Status:** ✅ Implemented (basic)  
**Impact:** Medium — broken image URLs now show a fallback instead of a broken icon.

- ✅ Added `onError` handler with SVG fallback to `MainImage` and `Thumbnails`.
- Consider adding an Error Boundary component around the slider.
- Add loading skeleton/shimmer while images are being fetched.

---

## Medium Priority

### 4. Accessibility (a11y)
**Status:** ✅ Partially implemented  
**Impact:** Medium — essential for usability and compliance.

- ✅ Added `role`, `aria-label`, `tabIndex`, and keyboard handlers to `Sections`.
- ✅ Added `aria-roledescription="carousel"` to the slider container.
- Add keyboard navigation (Arrow keys) to browse images.
- Add `aria-live` region to announce image changes to screen readers.
- Ensure sufficient color contrast ratios.

### 5. Constants & Configuration
**Status:** ✅ Implemented  
**Impact:** Medium — magic numbers are now centralized for easier customization.

- ✅ Extracted all thresholds, breakpoints, and limits to `src/constants.ts`.
- Consider making key constants configurable via component props.

### 6. Bug Fix — Scroll Accumulator
**Status:** ✅ Fixed  
**Impact:** Medium — touchpad scrolling was unreliable on re-renders.

- ✅ Converted `deltaYAccumulator` from a local variable to `useRef` in `ImageSlider.tsx`.
- The local variable was reset to `0` on every render, causing touchpad scroll events to be lost.

### 7. Dependency Cleanup
**Status:** ✅ Implemented  
**Impact:** Low — reduces bundle size and attack surface.

- ✅ Removed unused `react-slick` and `react-draggable` dependencies.

---

## Low Priority / Future Enhancements

### 8. Performance Optimization
- Add `React.memo` to `Thumbnails`, `MainImage`, and `ImageCounter` to prevent unnecessary re-renders.
- Replace `Math.random()` key in `Thumbnails` with a deterministic key to avoid full DOM remounts.
- Use `will-change: transform` CSS property for animated elements.
- Consider `IntersectionObserver` for lazy-loading off-screen thumbnails.

### 9. NPM Package Publishing
- Set `"private": false` and add `"main"` / `"module"` / `"types"` fields to `package.json`.
- Create a Vite library build configuration.
- Add `peerDependencies` for `react` and `react-dom`.
- Publish to npm as a reusable component.

### 10. Documentation
- Add JSDoc comments to all exported interfaces and components.
- Add Storybook for interactive component documentation.
- Create a live demo deployment (e.g., GitHub Pages, Vercel).

### 11. CI/CD Pipeline
- Add GitHub Actions for automated linting, building, and testing on PRs.
- Add automated deployment for the demo site.
- Add dependabot for automated dependency updates.

### 12. TypeScript Strictness
- Enable `noUncheckedIndexedAccess` in `tsconfig.json`.
- Add explicit return types to all functions.
- Replace `any` types (if introduced) with proper types.
