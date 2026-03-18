import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function MyNavBar({ user, setUser}) {
    // logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
    
    return (
        <Navbar data-testid="navbar" sticky="top" bg="light">
            <Container>
                <Navbar.Text className="navbar-title mx-auto">
                    🌤 Weather App
                </Navbar.Text>

                <div className="d-flex align-items-center gap-2">
                    <Navbar.Text>
                        Signed in as:{" "}
                        <strong>{user?.username || user?.email}</strong>
                    </Navbar.Text>

                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                        Log Out
                    </Button>
                </div>
            </Container>
        </Navbar>
    )
}

export default MyNavBar;