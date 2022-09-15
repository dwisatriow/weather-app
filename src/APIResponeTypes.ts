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
    daily_will_it_rain: number
    daily_chance_of_rain: number
    condition: {
      text: string
      icon: string
      code: number
    }
  }
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
    last_updated: string
    last_updated_epoch: number
    temp_c: number
    temp_f: number
    feelslike_c: number
    feelslike_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    is_day: number
  }
  forecast: {
    forecastday: ForecastDay[]
  }
}

export interface LocationSearch {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

export type SearchAPIResponse = LocationSearch[]
