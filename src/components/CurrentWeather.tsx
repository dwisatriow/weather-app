import { useState, useEffect } from 'react'
import { ForecastAPIResponse, Location } from '../APIResponeTypes'
import apiKey from '../apiKey.json'
import _ from 'lodash'

function CurrentWeather() {
  const [forecastWeather, setForecastWeather] = useState(
    {} as ForecastAPIResponse
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat: number = position.coords.latitude
      let long: number = position.coords.longitude

      let location: Location = {
        lat: lat.toFixed(2),
        long: long.toFixed(2),
      }
      requestCurrentWeather(location)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function requestCurrentWeather(location: Location) {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey.key}&q=${location.lat},${location.long}`
    )
    const json = (await res.json()) as ForecastAPIResponse

    if (!_.isEmpty(json)) {
      setLoading(false)
    }
    setForecastWeather(json)
  }

  console.log('<CurrentWeather />')

  if (loading) {
    return (
      <div
        id="current-weather"
        className="mx-auto mt-32 flex h-[250px] w-[500px] flex-col items-center justify-center rounded-md bg-gradient-to-b from-sky-400 to-sky-300 p-8 text-white"
      >
        <h1 className="text-xl font-bold">Loading weather info...</h1>
      </div>
    )
  }

  const { name, region, country } = forecastWeather.location
  const {
    last_updated,
    temp_c,
    condition: { text: conditionText, icon: conditionIcon },
  } = forecastWeather.current

  return (
    <div
      id="current-weather"
      className="mx-auto mt-32 flex h-[250px] w-[500px] flex-col justify-center rounded-md bg-gradient-to-b from-sky-400 to-sky-300 p-8 text-white"
    >
      <h1 className="font-bold">{`${name}, ${region}, ${country}`}</h1>
      <p className="text-sm">{`as of ${last_updated.substring(11)}`}</p>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-7xl">{`${temp_c}°C`}</p>
        <img
          src={conditionIcon}
          alt={conditionText}
          className="h-auto w-[80px]"
        />
      </div>

      <p className="font-bold">{conditionText}</p>
      <button className="mt-6 w-fit self-end rounded bg-gradient-to-l from-sky-600 to-sky-500 px-4 py-2 text-sm font-bold">
        Weekly Forecast
      </button>
    </div>
  )
}

export default CurrentWeather
