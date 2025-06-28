# Design System Overview

This document outlines the design system and reusable component structure for the BaltGoWebsite project.

## Goals
- Establish a consistent, scalable, and maintainable UI foundation.
- Enable rapid development through reusable components.
- Ensure accessibility and modern design best practices.

## Technologies
- **Chadcn UI (shadcn/ui)**: Provides accessible, customizable React components built on Radix UI primitives.
- **Tailwind CSS**: Utility-first CSS framework for styling and rapid prototyping.

## Structure

- All reusable UI components (e.g., Button, Input, Dialog) will live in `src/app/components/`.
- Components should be atomic and composable.
- Shared styles, design tokens, and utility functions will be centralized for consistency.

## Guidelines
- Prefer composition over inheritance.
- Use Tailwind CSS for styling, leveraging design tokens where possible.
- Follow accessibility best practices (WCAG, ARIA attributes as needed).
- Document each component’s props and usage with examples.

---

## Using Default Theme Colors When Refactoring Components

**Always use the semantic color classes defined in our Tailwind config, not hardcoded colors.**

### 1. Use Semantic Tailwind Classes
Use:
- `bg-primary`, `text-primary`, `border-primary`
- `bg-card`, `text-card-foreground`
- `bg-background`, `text-foreground`
- `border-border`, `ring-ring`
- `text-muted-foreground`, etc.

### 2. Don’t Use Hardcoded Tailwind Colors
Avoid classes like `bg-orange-500`, `text-gray-700`, `ring-blue-400`, etc. Always use the semantic names above.

### 3. Use Theme Border Radius and Shadows
For border radius, use `rounded-[var(--radius)]` or `rounded-md` as appropriate. For shadows, use `shadow` or `shadow-sm`.

### 4. Use CSS Variables for Custom Styles
If you need to write custom CSS, use the CSS variables from our theme, e.g.:
```css
color: hsl(var(--primary));
background: hsl(var(--card));
border-color: hsl(var(--border));
```

### 5. Example Conversion
Instead of:
```tsx
<div className="bg-white text-gray-900 border border-gray-200 rounded-lg">
```
Use:
```tsx
<div className="bg-card text-card-foreground border border-border rounded-[var(--radius)]">
```

### 6. Why?
This ensures all components automatically adapt to theme changes (like dark mode or brand color updates) and keeps the UI consistent.

**Instruction for contributors:**
> When refactoring, always use our semantic Tailwind classes for colors and borders (`bg-primary`, `text-card-foreground`, `border-border`, etc.), not hardcoded colors like `bg-orange-500` or `text-gray-700`. This ensures theme consistency and supports dark mode.

---

## Example Component Folder Structure

To support multiple variations and keep things organized, components are grouped by category (e.g., `buttons`, `inputs`). Each category folder can contain multiple related components and an `index.ts` for exports.

```
src/app/components/
  buttons/
    Button.tsx
    IconButton.tsx
    index.ts
  inputs/
    TextInput.tsx
    PasswordInput.tsx
    index.ts
  dialogs/
    Modal.tsx
    AlertDialog.tsx
    index.ts
```

> **Note:** This structure allows for easy expansion and multiple variations of a component type (e.g., primary/secondary buttons, different input types) while keeping the codebase clean and maintainable.

## Chadcn UI & Tailwind CSS Setup
- Chadcn UI and Tailwind CSS will be installed and configured as the foundation for all UI work.
- Custom components should extend or wrap Chadcn UI primitives when possible.

---

This document will be updated as the design system evolves. For detailed implementation steps, refer to the project README and component documentation.
