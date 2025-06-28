import { validateEmail } from "./validateEmail";

describe("validateEmail", () => {
  it("returns true for valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name+tag@domain.co.uk")).toBe(true);
    expect(validateEmail("a@b.c")).toBe(true);
  });

  it("returns false for empty or structurally invalid emails", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("plainaddress")).toBe(false);
    expect(validateEmail("@missingusername.com")).toBe(false);
    expect(validateEmail("username@.com")).toBe(false);
    expect(validateEmail("username@domain")).toBe(false);
    expect(validateEmail("username@domain..com")).toBe(false);
  });

  it("returns false for emails with multiple @ symbols", () => {
    expect(validateEmail("user@@domain.com")).toBe(false);
    expect(validateEmail("user@domain@com")).toBe(false);
    expect(validateEmail("user@@@domain.com")).toBe(false);
  });

  it("returns false for emails with forbidden/special symbols", () => {
    expect(validateEmail("user name@domain.com")).toBe(false);
    expect(validateEmail("user,name@domain.com")).toBe(false);
    expect(validateEmail("user;name@domain.com")).toBe(false);
    expect(validateEmail("user<>@domain.com")).toBe(false);
    expect(validateEmail("user#@domain.com")).toBe(false);
    expect(validateEmail("user@domain!.com")).toBe(false);
  });

  it("correctly handles dots and pluses in weird places", () => {
    expect(validateEmail(".user@domain.com")).toBe(true); // leading dot in local is valid
    expect(validateEmail("user.@domain.com")).toBe(true); // trailing dot in local is valid
    expect(validateEmail("user..name@domain.com")).toBe(true); // consecutive dots in local is valid
    expect(validateEmail("user+@domain.com")).toBe(true); // plus at end of local is valid
    expect(validateEmail("+user@domain.com")).toBe(true); // plus at start of local is valid
    expect(validateEmail("user+name@domain.com")).toBe(true); // plus in local is valid
    expect(validateEmail("user@do+main.com")).toBe(false); // plus in domain is invalid
    expect(validateEmail("user@.domain.com")).toBe(false); // domain starts with dot
    expect(validateEmail("user@domain.com.")).toBe(false); // domain ends with dot
    expect(validateEmail("user@domain..com")).toBe(false); // domain has consecutive dots
  });
});
