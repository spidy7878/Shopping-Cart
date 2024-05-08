import { useContext, createContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Define the type for the shopping cart context
type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number
    cartItems: CartItem[]
}

// Define the type for each item in the cart
type CartItem = {
    id: number;
    quantity: number;
}

// Define props for the ShoppingCartProvider component
type ShoppingCartProviderProps = {
    children: ReactNode;
}

// Create a context for the shopping cart
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Custom hook to consume the shopping cart context
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

// Component to provide the shopping cart context to its children
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    // State to store the cart items
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
    const [isOpen, setIsOpen] = useState(false)
    const cartQuantity = cartItems.reduce(
        (quantity,item) => item.quantity + quantity,0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    // Function to get the quantity of an item in the cart
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    // Function to increase the quantity of an item in the cart
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    // Function to decrease the quantity of an item in the cart
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    // Function to remove an item from the cart
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        });
    }

    // Provide the shopping cart context value to its children
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart,  cartItems, cartQuantity }}>
            {children}
            <ShoppingCart  isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    );
}
