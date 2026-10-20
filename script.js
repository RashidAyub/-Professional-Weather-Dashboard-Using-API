/**
 * SkyPulse Pro - Professional Weather Dashboard
 * Core JavaScript Logic & API Integration
 * Auspify Technologies Frontend Internship - Task 4
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Application State & Configuration
  // ==========================================================================
  const state = {
    apiKey: '',
    isLiveConnected: false,
    currentCity: 'London',
    unit: 'metric', // 'metric' (°C) or 'imperial' (°F)
    currentWeatherData: null,
    forecastData: null,
    isLoading: false,
    clockTimer: null
  };

  // Pre-configured rich realistic demo datasets for instant out-of-the-box demonstration
  const DEMO_WEATHER_DATABASE = {
    'london': {
      name: 'London',
      country: 'GB',
      timezone: 3600,
      weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
      main: { temp: 18.4, feels_like: 17.8, temp_min: 13.2, temp_max: 21.6, pressure: 1014, humidity: 68 },
      wind: { speed: 4.1, deg: 195, gust: 6.2 },
      visibility: 10000,
      clouds: { all: 45 },
      sys: { sunrise: 1714364400, sunset: 1714418400 }
    },
    'new york': {
      name: 'New York',
      country: 'US',
      timezone: -14400,
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      main: { temp: 22.8, feels_like: 23.1, temp_min: 17.5, temp_max: 26.2, pressure: 1018, humidity: 52 },
      wind: { speed: 3.6, deg: 120, gust: 5.1 },
      visibility: 10000,
      clouds: { all: 10 },
      sys: { sunrise: 1714384200, sunset: 1714434600 }
    },
    'tokyo': {
      name: 'Tokyo',
      country: 'JP',
      timezone: 32400,
      weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10n' }],
      main: { temp: 16.5, feels_like: 16.2, temp_min: 14.1, temp_max: 18.0, pressure: 1008, humidity: 82 },
      wind: { speed: 5.8, deg: 60, gust: 8.5 },
      visibility: 8000,
      clouds: { all: 88 },
      sys: { sunrise: 1714333800, sunset: 1714382400 }
    },
    'paris': {
      name: 'Paris',
      country: 'FR',
      timezone: 7200,
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
      main: { temp: 20.1, feels_like: 19.8, temp_min: 14.0, temp_max: 23.5, pressure: 1016, humidity: 59 },
      wind: { speed: 3.2, deg: 230, gust: 4.8 },
      visibility: 10000,
      clouds: { all: 24 },
      sys: { sunrise: 1714363200, sunset: 1714419000 }
    },
    'dubai': {
      name: 'Dubai',
      country: 'AE',
      timezone: 14400,
      weather: [{ id: 800, main: 'Clear', description: 'sunny and dry', icon: '01d' }],
      main: { temp: 34.2, feels_like: 37.5, temp_min: 28.0, temp_max: 38.6, pressure: 1006, humidity: 38 },
      wind: { speed: 4.5, deg: 310, gust: 7.2 },
      visibility: 9000,
      clouds: { all: 5 },
      sys: { sunrise: 1714354800, sunset: 1714402200 }
    },
    'sydney': {
      name: 'Sydney',
      country: 'AU',
      timezone: 36000,
      weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      main: { temp: 19.3, feels_like: 19.0, temp_min: 15.2, temp_max: 22.8, pressure: 1022, humidity: 65 },
      wind: { speed: 6.2, deg: 180, gust: 9.1 },
      visibility: 10000,
      clouds: { all: 70 },
      sys: { sunrise: 1714334400, sunset: 1714374600 }
    },
    'mumbai': {
      name: 'Mumbai',
      country: 'IN',
      timezone: 19800,
      weather: [{ id: 721, main: 'Haze', description: 'hazy sunshine', icon: '50d' }],
      main: { temp: 31.8, feels_like: 36.4, temp_min: 27.5, temp_max: 34.0, pressure: 1010, humidity: 74 },
      wind: { speed: 3.9, deg: 260, gust: 5.6 },
      visibility: 5000,
      clouds: { all: 20 },
      sys: { sunrise: 1714351800, sunset: 1714397400 }
    }
  };

  // ==========================================================================
  // 2. DOM Elements Cache
  // ==========================================================================
  const dom = {
    // Top Bar & Controls
    liveClock: document.getElementById('liveClock'),
    liveDate: document.getElementById('liveDate'),
    unitCelsiusBtn: document.getElementById('unitCelsiusBtn'),
    unitFahrenheitBtn: document.getElementById('unitFahrenheitBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    apiModalBtn: document.getElementById('apiModalBtn'),
    apiStatusBadge: document.getElementById('apiStatusBadge'),
    
    // Search
    searchForm: document.getElementById('searchForm'),
    cityInput: document.getElementById('cityInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    geoBtn: document.getElementById('geoBtn'),
    quickChips: document.getElementById('quickChips'),

    // Alert Banner
    alertBanner: document.getElementById('alertBanner'),
    alertMessage: document.getElementById('alertMessage'),
    alertIcon: document.getElementById('alertIcon'),
    alertDismissBtn: document.getElementById('alertDismissBtn'),

    // Hero Section
    heroCard: document.getElementById('heroCard'),
    cityName: document.getElementById('cityName'),
    countryCode: document.getElementById('countryCode'),
    localTimeText: document.getElementById('localTimeText'),
    conditionPill: document.getElementById('conditionPill'),
    conditionPillIcon: document.getElementById('conditionPillIcon'),
    conditionText: document.getElementById('conditionText'),
    currentTemp: document.getElementById('currentTemp'),
    displayUnit: document.getElementById('displayUnit'),
    mainWeatherIcon: document.getElementById('mainWeatherIcon'),
    weatherDescription: document.getElementById('weatherDescription'),
    highTemp: document.getElementById('highTemp'),
    lowTemp: document.getElementById('lowTemp'),
    sunriseTime: document.getElementById('sunriseTime'),
    sunsetTime: document.getElementById('sunsetTime'),

    // Metrics
    feelsLikeVal: document.getElementById('feelsLikeVal'),
    feelsLikeHint: document.getElementById('feelsLikeHint'),
    humidityVal: document.getElementById('humidityVal'),
    humidityProgress: document.getElementById('humidityProgress'),
    dewPointHint: document.getElementById('dewPointHint'),
    windSpeedVal: document.getElementById('windSpeedVal'),
    windCompass: document.getElementById('windCompass'),
    windDirText: document.getElementById('windDirText'),
    windGustHint: document.getElementById('windGustHint'),
    pressureVal: document.getElementById('pressureVal'),
    pressureHint: document.getElementById('pressureHint'),
    visibilityVal: document.getElementById('visibilityVal'),
    visibilityHint: document.getElementById('visibilityHint'),
    cloudVal: document.getElementById('cloudVal'),
    cloudProgress: document.getElementById('cloudProgress'),
    cloudHint: document.getElementById('cloudHint'),

    // Forecast Tracks
    hourlyTrack: document.getElementById('hourlyTrack'),
    dailyForecastList: document.getElementById('dailyForecastList'),

    // Modal
    apiModal: document.getElementById('apiModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    pasteKeyBtn: document.getElementById('pasteKeyBtn'),
    saveKeyBtn: document.getElementById('saveKeyBtn'),
    enableDemoBtn: document.getElementById('enableDemoBtn'),
    keyValidationMessage: document.getElementById('keyValidationMessage'),
    modalStatusText: document.getElementById('modalStatusText'),

    // Loading
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingText: document.getElementById('loadingText')
  };

  // ==========================================================================
  // 3. Initialization
  // ==========================================================================
  function init() {
    initClock();
    loadStoredSettings();
    attachEventListeners();
    
    // Initial fetch for default city
    fetchWeatherByCity(state.currentCity);
  }

  // Live Digital Clock & Date
  function initClock() {
    function updateClock() {
      const now = new Date();
      dom.liveClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      dom.liveDate.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
    updateClock();
    state.clockTimer = setInterval(updateClock, 1000);
  }

  // Load configuration and stored credentials
  function loadStoredSettings() {
    const storedKey = localStorage.getItem('openweather_api_key');
    const storedUnit = localStorage.getItem('weather_dashboard_unit');

    if (storedUnit && (storedUnit === 'metric' || storedUnit === 'imperial')) {
      state.unit = storedUnit;
      updateUnitButtonsUI();
    } else if (window.CONFIG && window.CONFIG.DEFAULT_UNIT) {
      state.unit = window.CONFIG.DEFAULT_UNIT;
      updateUnitButtonsUI();
    }

    if (storedKey && storedKey.trim().length > 0) {
      state.apiKey = storedKey.trim();
    } else if (window.CONFIG && window.CONFIG.API_KEY && window.CONFIG.API_KEY.trim().length > 0) {
      state.apiKey = window.CONFIG.API_KEY.trim();
    }

    if (window.CONFIG && window.CONFIG.DEFAULT_CITY) {
      state.currentCity = window.CONFIG.DEFAULT_CITY;
    }

    updateApiStatusBadge();
  }

  function updateApiStatusBadge() {
    if (state.apiKey && state.isLiveConnected) {
      dom.apiStatusBadge.textContent = 'Live API';
      dom.apiStatusBadge.classList.add('live');
      dom.modalStatusText.textContent = 'Connected: Live OpenWeatherMap API active';
    } else if (state.apiKey) {
      dom.apiStatusBadge.textContent = 'Key Saved';
      dom.apiStatusBadge.classList.remove('live');
      dom.modalStatusText.textContent = 'API Key saved. Ready to test connection on next query.';
    } else {
      dom.apiStatusBadge.textContent = 'Demo Mode';
      dom.apiStatusBadge.classList.remove('live');
      dom.modalStatusText.textContent = 'Current Mode: Interactive Demo Mode (Simulated data)';
    }
  }

  function updateUnitButtonsUI() {
    if (state.unit === 'metric') {
      dom.unitCelsiusBtn.classList.add('active');
      dom.unitFahrenheitBtn.classList.remove('active');
      dom.displayUnit.textContent = '°C';
    } else {
      dom.unitFahrenheitBtn.classList.add('active');
      dom.unitCelsiusBtn.classList.remove('active');
      dom.displayUnit.textContent = '°F';
    }
  }

  // ==========================================================================
  // 4. Event Listeners & Interaction Handlers
  // ==========================================================================
  function attachEventListeners() {
    // Form search submit
    dom.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = dom.cityInput.value.trim();
      if (!city) {
        showAlert('Please enter a city name to search.', 'warning');
        return;
      }
      fetchWeatherByCity(city);
    });

    // Clear search button toggle
    dom.cityInput.addEventListener('input', () => {
      if (dom.cityInput.value.trim().length > 0) {
        dom.clearSearchBtn.classList.add('visible');
      } else {
        dom.clearSearchBtn.classList.remove('visible');
      }
    });

    dom.clearSearchBtn.addEventListener('click', () => {
      dom.cityInput.value = '';
      dom.clearSearchBtn.classList.remove('visible');
      dom.cityInput.focus();
    });

    // Quick chips click
    dom.quickChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const city = chip.dataset.city;
      if (city) {
        dom.cityInput.value = city;
        dom.clearSearchBtn.classList.add('visible');
        updateActiveChip(city);
        fetchWeatherByCity(city);
      }
    });

    // Geolocation button
    dom.geoBtn.addEventListener('click', handleGeolocation);

    // Refresh button
    dom.refreshBtn.addEventListener('click', () => {
      dom.refreshBtn.classList.add('spinning');
      fetchWeatherByCity(state.currentCity, () => {
        setTimeout(() => dom.refreshBtn.classList.remove('spinning'), 600);
      });
    });

    // Unit toggle buttons
    dom.unitCelsiusBtn.addEventListener('click', () => setUnit('metric'));
    dom.unitFahrenheitBtn.addEventListener('click', () => setUnit('imperial'));

    // Modal controls
    dom.apiModalBtn.addEventListener('click', openApiModal);
    dom.closeModalBtn.addEventListener('click', closeApiModal);
    dom.apiModal.addEventListener('click', (e) => {
      if (e.target === dom.apiModal) closeApiModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.apiModal.classList.contains('open')) {
        closeApiModal();
      }
    });

    // Modal action buttons
    dom.saveKeyBtn.addEventListener('click', handleSaveApiKey);
    dom.enableDemoBtn.addEventListener('click', handleEnableDemoMode);

    // Paste button in modal
    dom.pasteKeyBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) dom.apiKeyInput.value = text.trim();
      } catch (err) {
        showAlert('Clipboard access denied or unsupported.', 'info');
      }
    });

    // Dismiss alert banner
    dom.alertDismissBtn.addEventListener('click', hideAlert);
  }

  function updateActiveChip(cityName) {
    const chips = dom.quickChips.querySelectorAll('.chip');
    chips.forEach(chip => {
      if (chip.dataset.city.toLowerCase() === cityName.toLowerCase()) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  function setUnit(newUnit) {
    if (state.unit === newUnit) return;
    state.unit = newUnit;
    localStorage.setItem('weather_dashboard_unit', newUnit);
    updateUnitButtonsUI();

    // Re-render current weather & forecasts with the updated unit
    if (state.currentWeatherData && state.forecastData) {
      renderDashboard(state.currentWeatherData, state.forecastData);
    } else {
      fetchWeatherByCity(state.currentCity);
    }
  }

  // ==========================================================================
  // 5. Geolocation Support
  // ==========================================================================
  function handleGeolocation() {
    if (!navigator.geolocation) {
      showAlert('Geolocation is not supported by your browser.', 'warning');
      return;
    }

    showLoading('Locating via GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        hideLoading();
        let errorMsg = 'Unable to retrieve location.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission was denied. Please search manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Location information is unavailable.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out.';
        }
        showAlert(errorMsg, 'warning');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  // ==========================================================================
  // 6. Data Fetching & API Communication
  // ==========================================================================
  async function fetchWeatherByCity(city, callback) {
    showLoading(`Fetching weather for ${city}...`);
    hideAlert();

    // Check if a real OpenWeather API key is configured
    if (state.apiKey && state.apiKey.length > 10) {
      try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${state.unit}&appid=${state.apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${state.unit}&appid=${state.apiKey}`;

        const [currRes, foreRes] = await Promise.all([
          fetch(currentUrl),
          fetch(forecastUrl)
        ]);

        if (currRes.status === 401 || foreRes.status === 401) {
          state.isLiveConnected = false;
          updateApiStatusBadge();
          throw new Error('Invalid OpenWeather API Key. Please check the key in Settings or config.js.');
        }

        if (currRes.status === 404 || foreRes.status === 404) {
          throw new Error(`City "${city}" not found. Please verify the spelling.`);
        }

        if (!currRes.ok || !foreRes.ok) {
          throw new Error(`API error (${currRes.status}). Falling back to simulation.`);
        }

        const currentData = await currRes.json();
        const forecastData = await foreRes.json();

        state.isLiveConnected = true;
        updateApiStatusBadge();
        state.currentCity = currentData.name;
        state.currentWeatherData = currentData;
        state.forecastData = forecastData;

        renderDashboard(currentData, forecastData);
        updateActiveChip(currentData.name);
        showAlert(`Live weather updated for ${currentData.name}, ${currentData.sys.country}!`, 'success');
      } catch (err) {
        console.warn('Live API request failed:', err.message);
        state.isLiveConnected = false;
        updateApiStatusBadge();
        
        // Provide friendly fallback to demo simulation so dashboard remains interactive
        showAlert(`${err.message} Switched to Demo Mode for presentation.`, 'warning');
        loadDemoWeather(city);
      } finally {
        hideLoading();
        if (callback) callback();
      }
    } else {
      // Offline / Demo Mode simulation
      setTimeout(() => {
        loadDemoWeather(city);
        hideLoading();
        if (callback) callback();
      }, 350); // slight delay for smooth realistic loading feel
    }
  }

  async function fetchWeatherByCoordinates(lat, lon) {
    if (state.apiKey && state.apiKey.length > 10) {
      try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${state.unit}&appid=${state.apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${state.unit}&appid=${state.apiKey}`;

        const [currRes, foreRes] = await Promise.all([
          fetch(currentUrl),
          fetch(forecastUrl)
        ]);

        if (!currRes.ok || !foreRes.ok) throw new Error('Could not fetch coordinates data from API.');

        const currentData = await currRes.json();
        const forecastData = await foreRes.json();

        state.isLiveConnected = true;
        updateApiStatusBadge();
        state.currentCity = currentData.name;
        state.currentWeatherData = currentData;
        state.forecastData = forecastData;

        renderDashboard(currentData, forecastData);
        showAlert(`Weather loaded for your current location (${currentData.name})!`, 'success');
      } catch (err) {
        showAlert(err.message, 'warning');
        loadDemoWeather('London');
      } finally {
        hideLoading();
      }
    } else {
      showAlert('API Key required for real GPS lookups. Displaying nearest featured hub (London).', 'info');
      loadDemoWeather('London');
      hideLoading();
    }
  }

  // ==========================================================================
  // 7. Dynamic Simulation Generator (Demo Mode)
  // ==========================================================================
  function loadDemoWeather(cityName) {
    const key = cityName.toLowerCase().trim();
    let currentData = DEMO_WEATHER_DATABASE[key];

    // If city is not in predefined database, procedurally synthesize realistic weather data
    if (!currentData) {
      currentData = generateSyntheticWeatherData(cityName);
    }

    // Convert temperature values if imperial
    const preparedCurrent = adaptUnits(JSON.parse(JSON.stringify(currentData)));
    const preparedForecast = generateForecastFromCurrent(preparedCurrent);

    state.currentCity = preparedCurrent.name;
    state.currentWeatherData = preparedCurrent;
    state.forecastData = preparedForecast;

    renderDashboard(preparedCurrent, preparedForecast);
    updateActiveChip(preparedCurrent.name);
  }

  function generateSyntheticWeatherData(cityName) {
    // Generate pseudo-deterministic numbers based on city name hash
    let hash = 0;
    for (let i = 0; i < cityName.length; i++) {
      hash = (hash << 5) - hash + cityName.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    const conditions = [
      { id: 800, main: 'Clear', description: 'clear sunny sky', icon: '01d' },
      { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
      { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' },
      { id: 500, main: 'Rain', description: 'moderate rain showers', icon: '10d' },
      { id: 211, main: 'Thunderstorm', description: 'thunderstorm with rain', icon: '11d' }
    ];

    const cond = conditions[absHash % conditions.length];
    const baseTemp = 14 + (absHash % 18); // 14 to 32 C

    return {
      name: capitalize(cityName),
      country: 'GLOBAL',
      timezone: ((absHash % 25) - 12) * 3600,
      weather: [cond],
      main: {
        temp: baseTemp,
        feels_like: baseTemp - 1.2,
        temp_min: baseTemp - 4.5,
        temp_max: baseTemp + 4.8,
        pressure: 1010 + (absHash % 15),
        humidity: 45 + (absHash % 45)
      },
      wind: {
        speed: (2 + (absHash % 7)).toFixed(1),
        deg: absHash % 360,
        gust: (5 + (absHash % 8)).toFixed(1)
      },
      visibility: 10000,
      clouds: { all: 30 + (absHash % 60) },
      sys: {
        sunrise: Math.floor(Date.now() / 1000) - 18000,
        sunset: Math.floor(Date.now() / 1000) + 18000
      }
    };
  }

  function adaptUnits(data) {
    if (state.unit === 'imperial') {
      // If dataset is metric, convert to imperial
      data.main.temp = cToF(data.main.temp);
      data.main.feels_like = cToF(data.main.feels_like);
      data.main.temp_min = cToF(data.main.temp_min);
      data.main.temp_max = cToF(data.main.temp_max);
      // Wind speed m/s to mph
      data.wind.speed = (parseFloat(data.wind.speed) * 2.23694).toFixed(1);
    }
    return data;
  }

  function generateForecastFromCurrent(curr) {
    const list = [];
    const now = Math.floor(Date.now() / 1000);
    const baseTemp = curr.main.temp;

    // 24-hour hourly simulation (8 steps of 3 hours)
    for (let i = 1; i <= 8; i++) {
      const timeOffset = i * 3 * 3600;
      const hourTempDelta = Math.sin((i / 8) * Math.PI * 2) * 3.5;
      list.push({
        dt: now + timeOffset,
        main: {
          temp: parseFloat((baseTemp + hourTempDelta).toFixed(1)),
          humidity: Math.min(100, Math.max(30, curr.main.humidity + Math.round(hourTempDelta * 2)))
        },
        weather: curr.weather,
        pop: (0.1 * ((i * 3) % 7)).toFixed(2)
      });
    }

    // Extended 5 days simulation
    for (let d = 1; d <= 5; d++) {
      const dayOffset = d * 86400;
      const variation = ((d % 2 === 0 ? 1 : -1) * (d * 1.2));
      list.push({
        dt: now + dayOffset + 43200, // midday
        main: {
          temp: parseFloat((baseTemp + variation).toFixed(1)),
          temp_min: parseFloat((baseTemp + variation - 3.8).toFixed(1)),
          temp_max: parseFloat((baseTemp + variation + 4.2).toFixed(1)),
          humidity: Math.min(95, Math.max(35, curr.main.humidity + (d * 4)))
        },
        weather: [getConditionVariation(curr.weather[0], d)],
        pop: (0.15 * d).toFixed(2)
      });
    }

    return { list };
  }

  function getConditionVariation(baseCond, index) {
    const options = [
      { id: 800, main: 'Clear', description: 'sunny and clear', icon: '01d' },
      { id: 802, main: 'Clouds', description: 'partly cloudy', icon: '03d' },
      { id: 500, main: 'Rain', description: 'light showers', icon: '10d' },
      { id: 801, main: 'Clouds', description: 'scattered clouds', icon: '02d' },
      { id: 804, main: 'Clouds', description: 'mostly overcast', icon: '04d' }
    ];
    return options[(baseCond.id + index) % options.length];
  }

  // ==========================================================================
  // 8. Dynamic UI Rendering
  // ==========================================================================
  function renderDashboard(current, forecast) {
    // 1. Theme application
    applyAtmosphericTheme(current);

    // 2. Hero Card Info
    dom.cityName.textContent = current.name;
    dom.countryCode.textContent = current.sys ? current.sys.country : '';
    
    // Local Time
    const localTime = getFormattedLocalTime(current.timezone);
    dom.localTimeText.textContent = `Local Time: ${localTime}`;

    // Condition Pill & Description
    const weatherObj = current.weather && current.weather[0] ? current.weather[0] : { main: 'Clear', description: 'Clear sky', id: 800 };
    dom.conditionText.textContent = weatherObj.main;
    dom.weatherDescription.textContent = weatherObj.description;
    
    // Main weather icon
    const iconClass = getWeatherIconClass(weatherObj.id, weatherObj.icon);
    dom.mainWeatherIcon.className = `fa-solid ${iconClass} main-weather-icon`;
    dom.conditionPillIcon.className = `fa-solid ${iconClass}`;

    // Temperature & Range
    const tempUnitSymbol = state.unit === 'metric' ? '°C' : '°F';
    const tempVal = Math.round(current.main.temp);
    dom.currentTemp.textContent = tempVal;
    dom.displayUnit.textContent = tempUnitSymbol;
    dom.highTemp.textContent = `${Math.round(current.main.temp_max)}${tempUnitSymbol}`;
    dom.lowTemp.textContent = `${Math.round(current.main.temp_min)}${tempUnitSymbol}`;

    // Sunrise & Sunset
    if (current.sys && current.sys.sunrise && current.sys.sunset) {
      dom.sunriseTime.textContent = formatSunTime(current.sys.sunrise, current.timezone);
      dom.sunsetTime.textContent = formatSunTime(current.sys.sunset, current.timezone);
    } else {
      dom.sunriseTime.textContent = '06:00 AM';
      dom.sunsetTime.textContent = '07:30 PM';
    }

    // 3. Highlight Metrics
    // Feels Like
    const feelsVal = Math.round(current.main.feels_like);
    dom.feelsLikeVal.textContent = `${feelsVal}${tempUnitSymbol}`;
    if (feelsVal < tempVal) {
      dom.feelsLikeHint.textContent = 'Wind makes it feel cooler';
    } else if (feelsVal > tempVal) {
      dom.feelsLikeHint.textContent = 'Humidity makes it feel warmer';
    } else {
      dom.feelsLikeHint.textContent = 'Matches actual temperature';
    }

    // Humidity
    const humidity = current.main.humidity;
    dom.humidityVal.textContent = `${humidity}%`;
    dom.humidityProgress.style.width = `${humidity}%`;
    const dewPoint = calculateDewPoint(current.main.temp, humidity);
    dom.dewPointHint.textContent = `Dew point is ${Math.round(dewPoint)}${tempUnitSymbol}`;

    // Wind Speed & Direction
    const windSpeedUnit = state.unit === 'metric' ? 'km/h' : 'mph';
    const speed = state.unit === 'metric' 
      ? Math.round(current.wind.speed * 3.6) // m/s to km/h
      : Math.round(current.wind.speed);
    dom.windSpeedVal.textContent = `${speed} ${windSpeedUnit}`;
    
    const deg = current.wind.deg || 0;
    dom.windCompass.style.transform = `rotate(${deg}deg)`;
    dom.windDirText.textContent = `${getCompassDirection(deg)} (${deg}°)`;
    
    if (current.wind.gust) {
      const gust = state.unit === 'metric' ? Math.round(current.wind.gust * 3.6) : Math.round(current.wind.gust);
      dom.windGustHint.textContent = `Gusts up to ${gust} ${windSpeedUnit}`;
    } else {
      dom.windGustHint.textContent = 'Steady gentle airflow';
    }

    // Pressure
    dom.pressureVal.textContent = `${current.main.pressure} hPa`;
    if (current.main.pressure > 1013) {
      dom.pressureHint.textContent = 'High pressure: stable weather';
    } else {
      dom.pressureHint.textContent = 'Low pressure: possible precipitation';
    }

    // Visibility
    const visKm = current.visibility ? (current.visibility / 1000).toFixed(1) : 10;
    if (state.unit === 'metric') {
      dom.visibilityVal.textContent = `${visKm} km`;
    } else {
      dom.visibilityVal.textContent = `${(visKm * 0.621371).toFixed(1)} mi`;
    }
    dom.visibilityHint.textContent = current.visibility >= 9000 ? 'Clear and unobstructed view' : 'Moderate ambient haze';

    // Cloud Cover
    const clouds = current.clouds ? current.clouds.all : 20;
    dom.cloudVal.textContent = `${clouds}%`;
    dom.cloudProgress.style.width = `${clouds}%`;
    dom.cloudHint.textContent = clouds < 25 ? 'Clear sunny skies' : clouds < 60 ? 'Scattered cloud layers' : 'Dense cloud blanket';

    // 4. Render Hourly & 5-Day Forecasts
    renderHourlyForecast(forecast, current.timezone);
    renderDailyForecast(forecast);
  }

  // 24-Hour Hourly Track Rendering
  function renderHourlyForecast(forecast, timezoneOffset) {
    dom.hourlyTrack.innerHTML = '';
    if (!forecast || !forecast.list || forecast.list.length === 0) return;

    // Take the first 8 interval records (next 24 hours in 3h blocks)
    const hourlyItems = forecast.list.slice(0, 8);

    hourlyItems.forEach((item, index) => {
      const date = new Date((item.dt + (timezoneOffset || 0)) * 1000);
      const hours = date.getUTCHours();
      const timeLabel = index === 0 ? 'Now' : format12Hour(hours);

      const weather = item.weather[0] || { id: 800, icon: '01d' };
      const iconClass = getWeatherIconClass(weather.id, weather.icon);
      const temp = Math.round(item.main.temp);
      const popPercent = Math.round((item.pop || 0) * 100);

      const card = document.createElement('div');
      card.className = `hourly-card ${index === 0 ? 'active-hour' : ''}`;
      card.innerHTML = `
        <span class="hourly-time">${timeLabel}</span>
        <i class="fa-solid ${iconClass} hourly-icon"></i>
        <span class="hourly-temp">${temp}°</span>
        <span class="hourly-pop" title="Precipitation chance">
          <i class="fa-solid fa-droplet"></i> ${popPercent}%
        </span>
      `;
      dom.hourlyTrack.appendChild(card);
    });
  }

  // 5-Day Daily Forecast Rendering
  function renderDailyForecast(forecast) {
    dom.dailyForecastList.innerHTML = '';
    if (!forecast || !forecast.list) return;

    // Group forecast entries by calendar day
    const dailyMap = {};
    const todayStr = new Date().toDateString();

    forecast.list.forEach(item => {
      const dateObj = new Date(item.dt * 1000);
      const dateKey = dateObj.toDateString();

      // Skip today if desired, or keep upcoming 5 distinct days
      if (dateKey === todayStr && Object.keys(dailyMap).length > 0) return;

      if (!dailyMap[dateKey]) {
        dailyMap[dateKey] = {
          date: dateObj,
          temps: [],
          weathers: [],
          pops: [],
          humidities: []
        };
      }

      dailyMap[dateKey].temps.push(item.main.temp);
      if (item.main.temp_min) dailyMap[dateKey].temps.push(item.main.temp_min);
      if (item.main.temp_max) dailyMap[dateKey].temps.push(item.main.temp_max);
      dailyMap[dateKey].weathers.push(item.weather[0]);
      dailyMap[dateKey].pops.push(item.pop || 0);
      dailyMap[dateKey].humidities.push(item.main.humidity);
    });

    const days = Object.values(dailyMap).slice(0, 5);

    days.forEach((dayData) => {
      const minTemp = Math.round(Math.min(...dayData.temps));
      const maxTemp = Math.round(Math.max(...dayData.temps));
      
      // Select midday or dominant weather
      const repWeather = dayData.weathers[Math.floor(dayData.weathers.length / 2)] || dayData.weathers[0];
      const iconClass = getWeatherIconClass(repWeather.id, repWeather.icon);
      
      const dayName = dayData.date.toLocaleDateString([], { weekday: 'short' });
      const dateFormatted = dayData.date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      const rainChance = Math.round(Math.max(...dayData.pops) * 100);
      const avgHumidity = Math.round(dayData.humidities.reduce((a, b) => a + b, 0) / dayData.humidities.length);

      const card = document.createElement('div');
      card.className = 'daily-card';
      card.innerHTML = `
        <div class="daily-day-group">
          <span class="daily-day-name">${dayName}</span>
          <span class="daily-date">${dateFormatted}</span>
        </div>
        
        <div class="daily-condition-group">
          <i class="fa-solid ${iconClass} daily-icon"></i>
          <span class="daily-condition-text">${repWeather.main}</span>
        </div>

        <div class="daily-temp-bar-container">
          <span class="temp-min-text">${minTemp}°</span>
          <div class="temp-range-track">
            <div class="temp-range-fill" style="width: 100%;"></div>
          </div>
          <span class="temp-max-text">${maxTemp}°</span>
        </div>

        <div class="daily-extra-metrics">
          <span class="daily-rain-chance" title="Chance of Rain">
            <i class="fa-solid fa-umbrella"></i> ${rainChance}%
          </span>
          <span class="daily-humidity" title="Average Humidity">
            <i class="fa-solid fa-droplet"></i> ${avgHumidity}%
          </span>
        </div>
      `;

      dom.dailyForecastList.appendChild(card);
    });
  }

  // ==========================================================================
  // 9. Atmospheric Theme Engine
  // ==========================================================================
  function applyAtmosphericTheme(weatherData) {
    const body = document.body;
    // Remove previous theme classes
    body.className = body.className.replace(/\btheme-\S+/g, '').trim();

    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      body.classList.add('theme-default');
      return;
    }

    const id = weatherData.weather[0].id;
    const icon = weatherData.weather[0].icon || '';
    const isNight = icon.includes('n');

    let theme = 'theme-default';

    if (id >= 200 && id < 300) {
      theme = 'theme-thunderstorm';
    } else if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) {
      theme = 'theme-rain';
    } else if (id >= 600 && id < 700) {
      theme = 'theme-snow';
    } else if (id >= 700 && id < 800) {
      theme = 'theme-atmosphere'; // mist, fog, haze
    } else if (id === 800) {
      theme = isNight ? 'theme-clear-night' : 'theme-clear-day';
    } else if (id > 800) {
      theme = 'theme-clouds';
    }

    body.classList.add(theme);
  }

  // Map OpenWeather weather IDs to modern FontAwesome icons
  function getWeatherIconClass(weatherId, iconCode = '') {
    const isNight = iconCode.includes('n');

    if (weatherId >= 200 && weatherId < 300) {
      return 'fa-cloud-bolt';
    } else if (weatherId >= 300 && weatherId < 400) {
      return 'fa-cloud-rain';
    } else if (weatherId >= 500 && weatherId < 600) {
      return weatherId >= 520 ? 'fa-cloud-showers-heavy' : 'fa-cloud-sun-rain';
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'fa-snowflake';
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'fa-smog';
    } else if (weatherId === 800) {
      return isNight ? 'fa-moon' : 'fa-sun';
    } else if (weatherId === 801 || weatherId === 802) {
      return isNight ? 'fa-cloud-moon' : 'fa-cloud-sun';
    } else if (weatherId >= 803) {
      return 'fa-cloud';
    }

    return 'fa-cloud-sun';
  }

  // ==========================================================================
  // 10. API Configuration Modal Handlers
  // ==========================================================================
  function openApiModal() {
    dom.apiKeyInput.value = state.apiKey;
    dom.keyValidationMessage.textContent = '';
    dom.apiModal.classList.add('open');
    dom.apiKeyInput.focus();
  }

  function closeApiModal() {
    dom.apiModal.classList.remove('open');
  }

  function handleSaveApiKey() {
    const inputKey = dom.apiKeyInput.value.trim();

    if (!inputKey) {
      dom.keyValidationMessage.textContent = 'Please enter an API key or click "Use Demo Mode".';
      dom.keyValidationMessage.style.color = '#f59e0b';
      return;
    }

    if (inputKey.length < 24) {
      dom.keyValidationMessage.textContent = 'Key seems too short. OpenWeather keys are 32 hexadecimal characters.';
      dom.keyValidationMessage.style.color = '#ef4444';
      return;
    }

    // Save key to local storage
    state.apiKey = inputKey;
    localStorage.setItem('openweather_api_key', inputKey);

    dom.keyValidationMessage.textContent = 'Key saved! Testing live connection...';
    dom.keyValidationMessage.style.color = '#10b981';

    setTimeout(() => {
      closeApiModal();
      fetchWeatherByCity(state.currentCity);
    }, 500);
  }

  function handleEnableDemoMode() {
    state.apiKey = '';
    state.isLiveConnected = false;
    localStorage.removeItem('openweather_api_key');
    dom.apiKeyInput.value = '';
    updateApiStatusBadge();
    showAlert('Demo Mode enabled with offline simulated data.', 'info');
    closeApiModal();
    loadDemoWeather(state.currentCity);
  }

  // ==========================================================================
  // 11. Helper Utilities
  // ==========================================================================
  function showLoading(msg = 'Fetching weather data...') {
    state.isLoading = true;
    dom.loadingText.textContent = msg;
    dom.loadingOverlay.classList.add('active');
  }

  function hideLoading() {
    state.isLoading = false;
    dom.loadingOverlay.classList.remove('active');
  }

  function showAlert(message, type = 'warning') {
    dom.alertMessage.textContent = message;
    dom.alertBanner.className = `alert-banner visible ${type}`;

    if (type === 'success') {
      dom.alertIcon.className = 'fa-solid fa-circle-check alert-icon';
    } else if (type === 'info') {
      dom.alertIcon.className = 'fa-solid fa-circle-info alert-icon';
    } else {
      dom.alertIcon.className = 'fa-solid fa-circle-exclamation alert-icon';
    }

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      hideAlert();
    }, 6000);
  }

  function hideAlert() {
    dom.alertBanner.classList.remove('visible');
  }

  function getFormattedLocalTime(timezoneOffsetSeconds = 0) {
    const utc = Date.now() + (new Date().getTimezoneOffset() * 60000);
    const targetDate = new Date(utc + (timezoneOffsetSeconds * 1000));
    return targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function formatSunTime(unixSeconds, timezoneOffsetSeconds = 0) {
    const utc = (unixSeconds * 1000) + (new Date().getTimezoneOffset() * 60000);
    const target = new Date(utc + (timezoneOffsetSeconds * 1000));
    return target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function format12Hour(hours) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${h} ${ampm}`;
  }

  function getCompassDirection(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((deg % 360) / 22.5) % 16;
    return directions[index];
  }

  function calculateDewPoint(tempC, humidity) {
    // Magnus formula approximation
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * tempC) / (b + tempC)) + Math.log(humidity / 100.0);
    return (b * alpha) / (a - alpha);
  }

  function cToF(c) {
    return parseFloat(((c * 9) / 5 + 32).toFixed(1));
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ==========================================================================
  // 12. Run on DOM Loaded
  // ==========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
