const { deterministicPartitionKey } = require("./dpk-refactored");

describe("reactored deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal '0' when supplied with a null input", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });
  it("Returns the same output whenever supplied with a specific input", () => {
    const input = "ClipboardHealth";

    const got = deterministicPartitionKey(input);
    const expected = deterministicPartitionKey(input);
    expect(got).toBe(expected);
  });
  it("Returns the value of partitionKey property of the input as-is when not longer than 256 chars", () => {
    const expected = "ClipboardHealth"
    const input = {
      "partitionKey": expected
    }
    const got = deterministicPartitionKey(input);
    expect(got).toBe(expected);
  });
  it("Returns the hashed value of partitionKey property of the input when longer than 256 chars", () => {
    const longKey = `
      80078007666888c3118941637ce945863630badcdd51cb3ef69fd076f17e7e629fb944b
      7d9c36748ff20b5cd8585409e85a9e4d306d9b0b93f2757d33cbc8c6f17e7e629fb944b
      a367666888c3118941637ce945863630badcdd51cb3ef69fd077d9c36748ff20b5cd858
      09e85a9e4d306d9b0b93f2757d33cbc8c6f17e7e629fb944b99a3678007666888c31189
      637ce945863630badcdd51cb3ef69fd077d9c36748ff20b5cd8585409e85a9e4d306d9b
      93f2757d33cbc8c6f17e7e629fb944b99a367d51cb3ef69fd077d9c36748ff20b5cd858
    `
    const input = {
      "partitionKey": longKey
    }
    const got = deterministicPartitionKey(input);
    expect(got.length).toBeLessThanOrEqual(256)
  });
});