export interface Location {
  lat: string
  long: string
}

export interface ForecastHour {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  // wind_mph: 1.8
  // wind_kph: 2.9
  // wind_degree: 160
  // wind_dir: 'SSE'
  // pressure_mb: 1014.0
  // pressure_in: 29.94
  // precip_mm: 0.3
  // precip_in: 0.01
  // humidity: 86
  // cloud: 84
  // feelslike_c: 25.8
  // feelslike_f: 78.4
  // windchill_c: 23.7
  // windchill_f: 74.7
  // heatindex_c: 25.8
  // heatindex_f: 78.4
  // dewpoint_c: 21.2
  // dewpoint_f: 70.2
  // will_it_rain: 1
  // chance_of_rain: 83
  // will_it_snow: 0
  // chance_of_snow: 0
  // vis_km: 10.0
  // vis_miles: 6.0
  // gust_mph: 3.1
  // gust_kph: 5.0
  // uv: 1.0
}

export interface ForecastDay {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    // maxwind_mph: 7.8
    // maxwind_kph: 12.6
    // totalprecip_mm: 6.1
    // totalprecip_in: 0.24
    // avgvis_km: 9.8
    // avgvis_miles: 6.0
    // avghumidity: 74.0
    daily_will_it_rain: number
    daily_chance_of_rain: number
    // daily_will_it_snow: 0
    // daily_chance_of_snow: 0
    condition: {
      text: string
      icon: string
      code: number
    }
    // uv: 6.0
  }
  // astro: {
  //   sunrise: '05:46 AM'
  //   sunset: '05:50 PM'
  //   moonrise: '10:04 PM'
  //   moonset: '09:20 AM'
  //   moon_phase: 'Waning Gibbous'
  //   moon_illumination: '60'
  // }
  hour: ForecastHour[]
}

export interface ForecastAPIResponse {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated: string // Local time when the real time data was updated.
    last_updated_epoch: number // Local time when the real time data was updated in unix time.
    temp_c: number // Temperature in celsius
    temp_f: number // Temperature in fahrenheit
    feelslike_c: number // Feels like temperature in celsius
    feelslike_f: number // Feels like temperature in fahrenheit
    condition: {
      text: string // Weather condition text
      icon: string // Weather icon url
      code: number // condition unique code.
    }
    // wind_mph 	decimal 	Wind speed in miles per hour
    // wind_kph 	decimal 	Wind speed in kilometer per hour
    // wind_degree 	int 	Wind direction in degrees
    // wind_dir 	string 	Wind direction as 16 point compass. e.g.: NSW
    // pressure_mb 	decimal 	Pressure in millibars
    // pressure_in 	decimal 	Pressure in inches
    // precip_mm 	decimal 	Precipitation amount in millimeters
    // precip_in 	decimal 	Precipitation amount in inches
    // humidity 	int 	Humidity as percentage
    // cloud 	int 	Cloud cover as percentage
    is_day: number // 1 = Yes 0 = No; Whether to show day condition icon or night icon
    // uv 	decimal 	UV Index
    // gust_mph 	decimal 	Wind gust in miles per hour
    // gust_kph 	decimal 	Wind gust in kilometer per hour
  }
  forecast: {
    forecastday: ForecastDay[]
  }
}
