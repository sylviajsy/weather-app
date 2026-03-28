import { beforeAll, describe, test, expect } from "vitest";

let token;

beforeAll(async () => {
  const res = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "siyi@email.com",
      password: "123456",
    }),
  });

  const data = await res.json();
  token = data.token;
});

describe('Favorites API test', () => {
    test("GET /api/fav should return favorites", async () => {
        const response = await fetch("http://localhost:8080/api/fav", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(Array.isArray(data)).toBe(true);
    });
})