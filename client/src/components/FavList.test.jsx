import { render, screen } from "@testing-library/react";
import FavList from "./FavList";

describe('FavList Unit Test', () => {
    test('renders favorite city cards when data is provided', async () => {
        const mockFavoriteWeather = [
            {
                id: 1,
                city_name: "Austin",
                weather: {
                main: {
                    temp: 72,
                    humidity: 65,
                },
                weather: [
                    {
                    description: "clear sky",
                    icon: "01d",
                    },
                ],
                },
            }
        ]

        render(<FavList favoriteWeather={mockFavoriteWeather} />);

        expect(screen.getByText(/the weather in your favorite cities/i)).toBeInTheDocument();
        expect(screen.getByText("Austin")).toBeInTheDocument();
        expect(screen.getByText(/72/i)).toBeInTheDocument();
    })
})