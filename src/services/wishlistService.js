import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const MAX_WISHLIST_SIZE = 20;

/**
 * Adds a stock to the user's wishlist if the limit hasn't been reached.
 * @param {string} userId - The current user's ID
 * @param {string} symbol - The stock symbol (e.g., 'AAPL')
 */
export const addToWishlist = async (userId, symbol) => {
    if (!userId || !symbol) return;
    const stockSymbol = symbol.toUpperCase();
    const userRef = doc(db, "users", userId);

    try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            const currentWishlist = data.wishlist || [];

            if (currentWishlist.length >= MAX_WISHLIST_SIZE) {
                throw new Error(`Wishlist limit reached. You can only follow ${MAX_WISHLIST_SIZE} stocks.`);
            }

            if (currentWishlist.includes(stockSymbol)) {
                throw new Error("Stock is already in your wishlist.");
            }

            await updateDoc(userRef, {
                wishlist: arrayUnion(stockSymbol)
            });
        } else {
            // Create new document if it doesn't exist
            await setDoc(userRef, {
                wishlist: [stockSymbol],
                createdAt: new Date()
            });
        }
        return true;
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
};

/**
 * Removes a stock from the user's wishlist.
 * @param {string} userId 
 * @param {string} symbol 
 */
export const removeFromWishlist = async (userId, symbol) => {
    if (!userId || !symbol) return;
    const stockSymbol = symbol.toUpperCase();
    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            wishlist: arrayRemove(stockSymbol)
        });
        return true;
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        throw error;
    }
};

/**
 * Subscribes to the user's wishlist for real-time updates.
 * @param {string} userId 
 * @param {function} callback - Function to call with the new wishlist array
 * @returns {function} - Unsubscribe function
 */
export const subscribeToWishlist = (userId, callback) => {
    if (!userId) return () => { };

    // Using standard import from top level is better, but let's stick to the top level imports we already have?
    // Actually I need to import onSnapshot at the top.
    return onSnapshot(doc(db, "users", userId), (doc) => {
        if (doc.exists()) {
            callback(doc.data().wishlist || []);
        } else {
            callback([]);
        }
    });
};
