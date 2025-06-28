# Testing

This project uses **Jest** and **ts-jest** for simple, maintainable unit testing with TypeScript.

## Setup
- All dependencies are installed with `npm install`.
- Configuration is in `jest.config.js`.

## Running Tests

```sh
npm test
```
Or, for more detailed output:
```sh
npx jest
```

## Writing Tests
- Place test files next to source files as `*.test.ts`.
- Use Jest's `describe` and `it` blocks for organizing tests.
- Example:

```typescript
describe('myFunction', () => {
  it('should work', () => {
    expect(myFunction()).toBe(true);
  });
});
```

## Resources
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [ts-jest Docs](https://kulshekhar.github.io/ts-jest/)
