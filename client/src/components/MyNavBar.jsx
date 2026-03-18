import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./MyNavBar.css";

function MyNavBar({ user, setUser}) {
    // logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
    
    return (
        <Navbar data-testid="navbar" fixed="top" bg="light" className="custom-navbar">
            <Container fluid className="navbar-inner">
                <div className="navbar-row">
                    <div className="nav-section left-space"></div>

                    <div className="nav-section center-title">
                        <span className="app-title">🌤 Weather App</span>
                    </div>
                
                    <div className="nav-section right-controls">
                           <span className="user-text">
                                👋 Hi, <strong>{user?.username || user?.email}</strong>
                            </span>

                            <Button variant="outline-light" size="sm" onClick={handleLogout}>
                                Log Out
                            </Button>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}

export default MyNavBar;