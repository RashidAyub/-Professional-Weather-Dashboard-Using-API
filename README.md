# SkyPulse Pro - Professional Weather Dashboard Using API

[![Auspify Technologies Internship](https://img.shields.io/badge/Auspify%20Technologies-Frontend%20Internship-blue?style=for-the-badge)](https://auspify.com)
[![Task](https://img.shields.io/badge/Task%204-Weather%20Dashboard%20API-success?style=for-the-badge)](#)
[![Technologies](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS%20%7C%20REST%20API-informational?style=for-the-badge)](#)

A high-performance, portfolio-quality **Weather Intelligence Dashboard** built with modern HTML5, CSS3, and vanilla JavaScript. Features a luxurious glassmorphism design, dynamic weather-reactive atmospheric themes, real-time OpenWeatherMap REST API integration, 24-hour hourly outlook, 5-day extended forecasts, and interactive Celsius/Fahrenheit switching.

---

## 🌟 Key Features

### 1. Modern Glassmorphism UI & Dynamic Visual Atmosphere
- **Liquid Glass Aesthetics:** Frosted glass backdrops (`backdrop-filter: blur(20px)`), ambient glowing orbs, soft floating micro-animations, and modern Plus Jakarta Sans typography.
- **Weather Atmosphere Engine:** The visual color palette and background gradient automatically transform in response to the current weather condition:
  - ☀️ **Clear Sky (Day):** Radiant golden amber & sky-blue horizons
  - 🌙 **Clear Sky (Night):** Deep midnight indigo with starry violet hues
  - ☁️ **Cloudy / Overcast:** Cool slate gray & misty periwinkle
  - 🌧️ **Rain & Drizzle:** Stormy ocean teal & aquamarine
  - ⚡ **Thunderstorm:** Electric violet, charcoal & lightning yellow
  - ❄️ **Snow:** Frosty crystal cyan & icy whites
  - 🌫️ **Atmosphere / Fog / Haze:** Soft lavender & diffused ambient gray

### 2. Main Dashboard & Comprehensive Metrics
- **Current City & Country:** Clean location header with map pin and accurate localized city time (accounting for UTC timezone offsets).
- **Temperature & Weather Hero:** Prominent temperature display, condition pill, high/low daily range, and dynamic weather icons.
- **Sunrise & Sunset Times:** Calculated and formatted in 12-hour AM/PM with sun/moon indicators.
- **Detailed Metric Cards:**
  - **Feels Like:** With comfort tag (e.g. *“Wind makes it feel cooler”*).
  - **Humidity:** Integrated progress gauge and calculated dew point.
  - **Wind Speed & Direction:** Real-time speed (`km/h` or `mph`), rotating compass arrow, and wind gust indicators.
  - **Atmospheric Pressure:** Barometric reading in `hPa`.
  - **Visibility:** Distance in `km` or `mi` with visibility clarity status.
  - **Cloud Cover:** Real-time cloud saturation percentage with animated progress bar.

### 3. City Search & Smart Location Discovery
- **Instant Search:** Full keyboard support (Enter key) and Search button with input clear (`✕`) action.
- **Input Validation:** Prevents blank searches and handles invalid city names with polite, dismissible alert banners.
- **Quick City Chips:** One-click shortcuts for world hubs: **London, New York, Tokyo, Paris, Dubai, Sydney, Mumbai**.
- **GPS Geolocation:** "My Location" button retrieves local coordinates via HTML5 `navigator.geolocation` API.

### 4. Hourly & 5-Day Weather Forecasts
- **24-Hour Hourly Forecast:** Horizontal scrollable track with 3-hour interval cards showing projected time, dynamic weather icon, temperature, and precipitation chance (`pop`).
- **5-Day Extended Outlook:** Responsive daily cards featuring the day of the week, formatted calendar date, weather condition, rain chance, average humidity, and iOS-style min/max temperature gradient range bars.

### 5. Interactive Features & Temperature Unit Conversion
- **Instant Unit Toggle:** Switch between Celsius (`°C`, `km/h`) and Fahrenheit (`°F`, `mph`) with real-time recalculation without page reload.
- **Refresh Weather Button:** Spinning animation indicator that re-queries the latest weather data.
- **In-App API Key Manager:** Set, test, or update your OpenWeather API key directly in the browser, stored securely in `localStorage`.
- **Intelligent Demo Mode Fallback:** Functions right out of the box with realistic simulation data even before obtaining an API key!

---

## 📁 File Structure

```
f:\internship\Auspify Technologies\Professional Weather Dashboard Using API\
│
├── index.html       # Semantic HTML5 structure, dashboard grid, and modal
├── style.css        # Vanilla CSS3 design system, atmospheric themes & glassmorphism
├── script.js       # Asynchronous JavaScript (Fetch API, DOM manipulation, state)
├── config.js       # API configuration file with key setting instructions
└── README.md       # Comprehensive documentation and testing guide
```

---

## 🔑 How to Obtain & Configure an OpenWeather API Key

The application integrates with the official [OpenWeatherMap API 2.5](https://openweathermap.org/api).

### Step 1: Sign up for Free
1. Go to [https://openweathermap.org/](https://openweathermap.org/)
2. Click **Sign In** at the top right, then select **Create an Account**.
3. Confirm your email address.

### Step 2: Copy your API Key
1. Click your username in the navigation bar and select **My API Keys**.
2. Copy the 32-character hexadecimal key (e.g. `3a8b2c1d0e9f8a7b6c5d4e3f2a1b0c9d`).
> **Important Note on OpenWeather Activation:** Newly created API keys typically take **10 to 60 minutes** to activate on OpenWeather's global servers. If an API call initially returns a `401 Unauthorized`, wait a little while or use the built-in **Demo Mode**.

### Step 3: Configure your Key (Two Methods)

#### Option A: In the Dashboard UI (Recommended)
1. Open the dashboard in your web browser.
2. Click the **Key icon / Badge** (`Demo`) in the top right corner of the header.
3. Paste your 32-character API key into the input field.
4. Click **"Save & Connect Live"**. The key will be stored in your browser's `localStorage` and tested immediately!

#### Option B: In `config.js`
1. Open [config.js](file:///f:/internship/Auspify%20Technologies/Professional%20Weather%20Dashboard%20Using%20API/config.js) in your code editor.
2. Replace the empty string in `API_KEY` with your actual key:
```javascript
const CONFIG = {
  API_KEY: 'your_32_character_api_key_here',
  CURRENT_WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather',
  FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast',
  DEFAULT_CITY: 'London',
  DEFAULT_UNIT: 'metric',
  ...
};
```

---

## 🚀 How to Run the Application

Because this dashboard is built with vanilla web technologies, you can run it easily through any of the following methods:

### Method 1: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Right-click [index.html](file:///f:/internship/Auspify%20Technologies/Professional%20Weather%20Dashboard%20Using%20API/index.html) and select **"Open with Live Server"**.
3. The dashboard will launch at `http://127.0.0.1:5500/`.

### Method 2: Python Local HTTP Server
Run this command in PowerShell or terminal inside the project directory:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000/` in your browser.

### Method 3: Direct File Opening
Double-click [index.html](file:///f:/internship/Auspify%20Technologies/Professional%20Weather%20Dashboard%20Using%20API/index.html) to open directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 🧪 Testing Guide

| Test Scenario | Steps | Expected Result |
| :--- | :--- | :--- |
| **City Search** | Type `Tokyo` and hit Enter or click **Search** | Fetches and renders Tokyo's weather, updates timezone, hero card, metrics, and forecasts |
| **Quick Chips** | Click the **Dubai** chip | Instantly loads Dubai's sunny weather and shifts atmosphere to amber gold |
| **Unit Toggle** | Click the **°F** button | All temperatures convert from Celsius to Fahrenheit, wind switches to mph |
| **Empty Search** | Click Search with empty input | Warning alert banner appears: *"Please enter a city name to search."* |
| **Invalid City** | Type `InvalidCityXYZ123` | Friendly error banner appears: *"City not found. Please verify the spelling."* |
| **Weather Refresh** | Click the Refresh button | Rotating icon spins and current city data reloads smoothly |
| **API Key Settings** | Click Key button, paste key, click Save | Key is stored and API badge switches to `Live API` when verified |
| **Atmospheric Themes** | Search `London` (clouds), `Tokyo` (rain), `Dubai` (sun) | Background gradients, orbs, and accents adapt dynamically |

---

## 👨‍💻 Author & Internship Details
- **Intern:** Frontend Developer Intern
- **Company:** Auspify Technologies
- **Task:** Task 4 — Professional Weather Dashboard Using API
- **License:** MIT
