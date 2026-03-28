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
    test('GET /api/fav should return favorites', async () => {
        const response = await fetch("http://localhost:8080/api/fav", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(Array.isArray(data)).toBe(true);
    });

    test('POST /api/fav adds a city', async () => {
        const response = await fetch("http://localhost:8080/api/fav", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                cityName: "Boston",
            }),
        });

        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.city_name).toBe("Boston");
    })

    test('DELETE /api/fav/:id deletes a city', async () => {
        const createRes = await fetch("http://localhost:8080/api/fav", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                cityName: "Dallas",
            }),
        });

        const created = await createRes.json();

        const deleteRes = await fetch(
            `http://localhost:8080/api/fav/${created.id}`,
            {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );

        const deleted = await deleteRes.json();

        expect(deleteRes.ok).toBe(true);
        expect(deleted.message).toMatch(/removed/i);
    })
})