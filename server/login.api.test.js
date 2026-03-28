import { describe, test, expect } from "vitest";

describe('POST /api/login', () => {
    test('Login Successfully', async () => {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "siyi@email.com",
                password: "123456",
            }),
        });

        const data = await response.json();

        expect(response.ok).toBe(true);
        expect(data.token).toBeDefined();
        expect(data.user.email).toBe("siyi@email.com");
    })
})