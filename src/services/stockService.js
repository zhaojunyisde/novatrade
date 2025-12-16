const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

/**
 * Search for stocks by symbol or name
 * @param {string} query 
 * @returns {Promise<Array>} List of matching stocks
 */
export const searchSymbols = async (query) => {
    if (!query) return [];

    if (!API_KEY) {
        console.warn("Finnhub API Key is missing. Check your .env file.");
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}/search?q=${query}&token=${API_KEY}`);
        const data = await response.json();

        if (data.result) {
            // Filter to only include common stock types to avoid noise
            return data.result.filter(item =>
                !item.symbol.includes('.') && // simplistic way to filter out some non-US primary listings if desired, or keep them
                (item.type === 'Common Stock' || item.type === 'ETP')
            );
        }
        return [];
    } catch (error) {
        console.error("Error searching symbols:", error);
        return [];
    }
};

/**
 * Get real-time quote data for a symbol
 * @param {string} symbol
 * @returns {Promise<Object>} Quote data { c: current, d: change, dp: percent, ... }
 */
export const getStockQuote = async (symbol) => {
    if (!symbol || !API_KEY) return null;

    try {
        const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        return null;
    }
}

/**
 * Generate mock data for visualization when API fails
 */
const generateMockData = (symbol, days = 90) => {
    const data = [];
    let price = 150; // Base price
    // Try to derive base price from hash of symbol to be consistent but varied
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    price = 50 + (hash % 400);

    const now = new Date();

    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Random walk
        const change = (Math.random() - 0.5) * (price * 0.05);
        price += change;

        data.push({
            date: date.toLocaleDateString(),
            timestamp: Math.floor(date.getTime() / 1000),
            price: parseFloat(price.toFixed(2)),
            open: parseFloat((price - change).toFixed(2)),
            high: parseFloat((price + Math.abs(change)).toFixed(2)),
            low: parseFloat((price - Math.abs(change)).toFixed(2)),
        });
    }
    return data;
};

/**
 * Get historical candle data for plotting
 * Uses Yahoo Finance via proxy to bypass Finnhub free tier limits on historical data
 * @param {string} symbol
 * @param {string} range - Time range ('1D', '1W', '1M', '3M', '1Y')
 * @returns {Promise<Array>} Array of formatted data points
 */
export const getStockCandles = async (symbol, range = '1M') => {
    if (!symbol) return null;

    let fetchRange = '1mo';
    let fetchInterval = '1d';

    switch (range) {
        case '1D':
            fetchRange = '1d';
            fetchInterval = '5m';
            break;
        case '1W':
            fetchRange = '5d';
            fetchInterval = '15m'; // or 60m
            break;
        case '1M':
            fetchRange = '1mo';
            fetchInterval = '1d';
            break;
        case '3M':
            fetchRange = '3mo';
            fetchInterval = '1d';
            break;
        case '1Y':
            fetchRange = '1y';
            fetchInterval = '1d';
            break;
        default:
            fetchRange = '1mo';
            fetchInterval = '1d';
    }

    // Use Yahoo Finance via allorigins proxy to avoid CORS and get free historical data
    const encodedUrl = encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${fetchRange}&interval=${fetchInterval}`);
    const URL = `https://api.allorigins.win/raw?url=${encodedUrl}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        const result = data.chart?.result?.[0];

        if (result) {
            const timestamps = result.timestamp;
            const quote = result.indicators.quote[0];

            if (!timestamps || !quote) return [];

            const formattedData = timestamps.map((ts, i) => ({
                date: range === '1D' || range === '1W'
                    ? new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Time for short ranges
                    : new Date(ts * 1000).toLocaleDateString(), // Date for long ranges
                timestamp: ts,
                price: quote.close[i],
                open: quote.open[i],
                high: quote.high[i],
                low: quote.low[i],
                volume: quote.volume[i]
            })).filter(item => item.price != null); // Filter out any null data points

            return formattedData;
        }
        return [];
    } catch (error) {
        console.error("Error fetching candles from Yahoo:", error);
        return [];
    }
};

/**
 * Get company profile (Market Cap, etc.)
 * @param {string} symbol 
 * @returns {Promise<Object>}
 */
export const getStockProfile = async (symbol) => {
    if (!symbol) return null;
    const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
    const BASE_URL = 'https://finnhub.io/api/v1';

    try {
        const response = await fetch(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}
