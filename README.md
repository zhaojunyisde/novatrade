# NovaTrade

NovaTrade is a modern, high-performance stock trading dashboard built with React and Vite. It features real-time stock data, interactive candlestick charts, and a persistent watchlist, all wrapped in a premium dark-themed UI.

![NovaTrade Dashboard](./dashboard-screenshot.png)

## Features

*   **Real-time Market Data**: Live stock quotes and daily percentage changes.
*   **Interactive Charts**: Dynamic candlestick/area charts with adjustable lookback periods (1D, 1W, 1M, 3M, 1Y).
*   **Watchlist Management**: Add and remove stocks from your personalized sidebar.
*   **Market Statistics**: View Market Cap, Volume, and Average Volume for selected assets.
*   **Premium UI**: Glassmorphism design with smooth animations and responsive layout.

## Tech Stack

*   **Frontend**: React, Vite
*   **Styling**: Vanilla CSS (Variables, Flexbox/Grid, Animations)
*   **Charting**: Recharts
*   **Data Sources**:
    *   **Finnhub API**: Real-time quotes and company profiles.
    *   **Yahoo Finance**: Historical candle data (via `allorigins` proxy).
*   **Backend / Auth**: Firebase (Authentication, Firestore).
*   **Icons**: Lucide React.

## Getting Started

### Prerequisites

*   Node.js (v14+)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/zhaojunyisde/novatrade.git
    cd novatrade
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_FINNHUB_API_KEY=your_finnhub_api_key
    ```
    *Note: Firebase configuration is currently hardcoded in `src/firebase.js`. For production, consider moving these to env variables as well.*

4.  Run Development Server:
    ```bash
    npm run dev
    ```

## Deployment

### Option 1: Vercel (Recommended)

The easiest way to deploy is using Vercel.

1.  Install Vercel CLI:
    ```bash
    npm i -g vercel
    ```
2.  Run deploy command:
    ```bash
    vercel
    ```
3.  Follow the prompts. Vercel will automatically detect Vite and set up the build settings.
4.  **Important**: Go to your project settings in Vercel dashboard and add the `VITE_FINNHUB_API_KEY` environment variable.

### Option 2: Firebase Hosting

Since the app uses Firebase, hosting it there is seamless.

1.  Install Firebase tools:
    ```bash
    npm install -g firebase-tools
    ```
2.  Login to Firebase:
    ```bash
    firebase login
    ```
3.  Initialize project:
    ```bash
    firebase init
    ```
    *   Select **Hosting**.
    *   Select your Firebase project.
    *   Public directory: `dist`
    *   Configure as a single-page app? **Yes**
4.  Build and Deploy:
    ```bash
    npm run build
    firebase deploy
    ```

### Manual Build

To create a production build manually:

```bash
npm run build
```

The output will be in the `dist` directory, ready to be served by any static host (Netlify, GitHub Pages, etc.).
