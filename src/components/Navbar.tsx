import { Button, Container,Nav, Navbar as NavbarBs} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
export function Navbar(){
    const {openCart, cartQuantity} = useShoppingCart()
    return(
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={ NavLink }>
                    Home
                </Nav.Link>
                <Nav.Link to="/store" as={ NavLink }>
                    Store
                </Nav.Link>
                <Nav.Link to="/about" as={ NavLink }>
                    About
                </Nav.Link>
            </Nav>

            { cartQuantity >0 && <Button 
                onClick={openCart}
                style={{width:"3rem", height:"3rem", position: "relative"}}
                variant="outline-primary"
                className="rounded-circle"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="shop"><path d="M29,13a1.009,1.009,0,0,0-.129-.492l-4.516-8A1,1,0,0,0,23.484,4H8.516a1,1,0,0,0-.871.508l-4.516,8A1.009,1.009,0,0,0,3,13a3.987,3.987,0,0,0,2,3.444V26a2,2,0,0,0,2,2h5.88a2,2,0,0,0,2-2V23.293a1.218,1.218,0,0,1,1-1.237A1.122,1.122,0,0,1,17.12,23.17V26a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V16.444A3.987,3.987,0,0,0,29,13Zm-2.014.238A2,2,0,0,1,23,13a.912.912,0,0,0-.028-.138.864.864,0,0,0-.01-.134L21.061,6H22.9ZM13.017,6H15v7a2,2,0,0,1-3.99.1ZM17,6h1.983l2.007,7.1A2,2,0,0,1,17,13ZM9.1,6h1.839l-1.9,6.728a.864.864,0,0,0-.01.134A.912.912,0,0,0,9,13a2,2,0,0,1-3.986.238ZM25,26H19.12V23.17a3.12,3.12,0,0,0-3.44-3.1,3.216,3.216,0,0,0-2.8,3.227V26H7V17a3.99,3.99,0,0,0,3-1.357,3.971,3.971,0,0,0,6-.025,3.971,3.971,0,0,0,6,.025A3.99,3.99,0,0,0,25,17Z"></path></svg>
            <div 
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
                color:"white",
                width:'1.5rem',
                height:'1.5rem',
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%,25%)"
            }}
            >{cartQuantity}</div>
            </Button>}
        </Container>
    </NavbarBs>
    )
}