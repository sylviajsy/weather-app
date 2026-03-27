import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";
import LoginPage from "./LoginPage";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Login Page Integration Test', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    })

    test('Login Successfully and stores token/user', async () => {
        const user = userEvent.setup();
        const mockSetUser = vi.fn();

        const mockResponse = {
            token: "fake-jwt-token",
            user: {
                id: 1,
                username: "Siyi",
                email: "siyi@email.com",
            },
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        render(<LoginPage setUser={mockSetUser} />);

        // userEvent typing
        await user.type(screen.getByPlaceholderText(/email/i), "siyi@email.com");
        await user.type(screen.getByPlaceholderText(/password/i), "123456");

        // userEvent click
        await user.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: "siyi@email.com",
                    password: "123456",
                }),
            });
        });

        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe("fake-jwt-token");
            expect(localStorage.getItem("user")).toBe(JSON.stringify(mockResponse.user));
            expect(mockSetUser).toHaveBeenCalledWith(mockResponse.user);
        });
    })

    test('Login fails', async () => {
        const user = userEvent.setup();
        const mockSetUser = vi.fn();

        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Invalid password",
            }),
        });

        render(<LoginPage setUser={mockSetUser} />);

        await user.type(screen.getByPlaceholderText(/email/i), "siyi@email.com");
        await user.type(screen.getByPlaceholderText(/password/i), "wrongpass");

        await user.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
        });

        expect(mockSetUser).not.toHaveBeenCalled();
        expect(localStorage.getItem("token")).toBeNull();
    })
})