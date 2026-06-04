// ─── OpenWeatherMap API ───────────────────────────────────────────────────────
// Kostenlosen Key holen: https://openweathermap.org/api
// Dann in .env eintragen: EXPO_PUBLIC_OWM_KEY=dein_key_hier

const API_KEY = process.env.EXPO_PUBLIC_OWM_KEY || "DEIN_API_KEY_HIER";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const OWM_ICON_MAP = {
  "01d": "☀️",  "01n": "🌙",
  "02d": "🌤️", "02n": "🌤️",
  "03d": "⛅",  "03n": "⛅",
  "04d": "☁️",  "04n": "☁️",
  "09d": "🌧️", "09n": "🌧️",
  "10d": "🌦️", "10n": "🌦️",
  "11d": "⛈️",  "11n": "⛈️",
  "13d": "❄️",  "13n": "❄️",
  "50d": "🌫️", "50n": "🌫️",
};

export async function fetchWeather(cityName) {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=de`
    );
    if (!res.ok) throw new Error("API error");
    const d = await res.json();

    return {
      city: d.name,
      temp: `${Math.round(d.main.temp)}°`,
      condition:
        d.weather[0].description.charAt(0).toUpperCase() +
        d.weather[0].description.slice(1),
      icon: OWM_ICON_MAP[d.weather[0].icon] || "🌡️",
      high: `${Math.round(d.main.temp_max)}°`,
      low: `${Math.round(d.main.temp_min)}°`,
      humidity: `${d.main.humidity}%`,
      wind: `${Math.round(d.wind.speed * 3.6)} km/h`,
      error: false,
    };
  } catch {
    return { error: true };
  }
}
