import { createContext, useState, useEffect } from "react";
import SummaryApi from '../common/index';
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Fetch user details from backend
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(SummaryApi.current_user.url, {
              method: SummaryApi.current_user.method,
                credentials: "include", // Ensures cookies are sent
            });

            if (!response.ok) throw new Error("Failed to fetch user details");

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Fetch cart details
    const fetchUserAddToCart = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProduct.url, {
              method: SummaryApi.addToCartProduct.method,
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to fetch cart");

            const data = await response.json();
            setCart(data.cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails(); // Fetch user when app loads
        fetchUserAddToCart(); // Fetch cart when app loads
    }, []);

    return (
        <Context.Provider value={{ user, cart, fetchUserDetails, fetchUserAddToCart }}>
            {children}
        </Context.Provider>
    );
};
