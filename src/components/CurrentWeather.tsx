import { useState, useEffect } from 'react'
import {
  ForecastAPIResponse,
  Location,
  SearchAPIResponse,
} from '../APIResponeTypes'
import apiKey from '../apiKey.json'
import _ from 'lodash'
import Modal from './Modal'
import { IoClose } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi'
import { IconContext } from 'react-icons'

function CurrentWeather() {
  const [forecastWeather, setForecastWeather] = useState(
    {} as ForecastAPIResponse
  )
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [searchParam, setSearchParam] = useState('')
  const [searchResults, setSearchResults] = useState([] as SearchAPIResponse)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (searchParam) {
  //     searchLocation()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParam])

  async function requestCurrentWeather(location: Location) {
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey.key}&q=${location.lat},${location.long}&days=7`
    )
    const json = (await res.json()) as ForecastAPIResponse

    if (!_.isEmpty(json)) {
      setLoading(false)
    }
    setForecastWeather(json)
  }

  async function searchLocation(keyword: string) {
    const res = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey.key}&q=${keyword}`
    )
    const json = (await res.json()) as SearchAPIResponse

    if (!_.isEmpty(json)) {
      setSearchResults(json)
    }
  }

  function weeklyForecastOnClick() {
    setShowModal(true)
  }

  function updateLocation(newLocation: Location) {
    setLoading(true)
    setSearchParam('')
    setSearchResults([])
    requestCurrentWeather(newLocation)
  }

  function handleSearchChange(e: string) {
    setSearchParam(e)
    searchLocation(e)
  }

  if (loading) {
    return (
      <div
        id="current-weather"
        className="mx-auto flex h-[280px] w-[600px] flex-col items-center justify-center rounded-md bg-gradient-to-b from-sky-400 to-sky-300 p-8 text-white"
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
  const { forecastday: forecastDays } = forecastWeather.forecast

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div
      id="current-weather"
      className="mx-auto flex h-[280px] w-[600px] flex-col justify-center rounded-md bg-gradient-to-b from-sky-400 to-sky-300 p-8 text-white"
    >
      <h1 className="font-bold">{`${name}, ${region}, ${country}`}</h1>
      <p className="text-sm">{`as of ${last_updated.substring(11)}`}</p>

      <div className="flex items-center justify-between">
        <p className="text-7xl">{`${temp_c}°C`}</p>
        <img
          src={conditionIcon}
          alt={conditionText}
          className="h-auto w-[100px]"
        />
      </div>

      <p className="font-bold">{conditionText}</p>
      <div className="mt-6 flex flex-row items-center justify-end">
        <button
          className="mr-auto w-fit rounded bg-gradient-to-l from-sky-600 to-sky-500 px-4 py-2 text-sm font-bold"
          onClick={weeklyForecastOnClick}
        >
          Weekly Forecast
        </button>

        <div className="relative">
          {searchResults.length > 0 ? (
            <div className="absolute bottom-6 h-auto max-h-[200px] w-full overflow-auto rounded-t border-b-8 border-white bg-white pb-4 pt-2 text-slate-600">
              <ul>
                {searchResults.map((loc) => (
                  <li className="rounded py-2 px-2 text-sm hover:cursor-pointer hover:bg-sky-200">
                    <button
                      className="h-full w-full text-left"
                      onClick={() =>
                        updateLocation({
                          lat: loc.lat.toFixed(2),
                          long: loc.lon.toFixed(2),
                        })
                      }
                    >
                      {loc.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <input
            type="text"
            className="relative z-10 rounded-l p-1 text-slate-800"
            value={searchParam}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="relative z-10 rounded-r bg-gradient-to-l from-sky-600 to-sky-500 p-2 hover:cursor-default">
            <IconContext.Provider value={{ className: '' }}>
              <div>
                <BiSearch />
              </div>
            </IconContext.Provider>
          </button>
        </div>
      </div>

      {showModal ? (
        <Modal>
          <div className="w-[700px] rounded bg-gradient-to-b from-sky-200 to-sky-100 p-8 text-center text-gray-800">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">
                Weekly Forecast -{' '}
                <span className="text-base font-normal">{`${name}, ${region}, ${country}`}</span>
              </h1>
              <button onClick={() => setShowModal(false)}>
                <IconContext.Provider value={{ className: 'h-auto w-[28px]' }}>
                  <div>
                    <IoClose />
                  </div>
                </IconContext.Provider>
              </button>
            </div>

            <div className="mt-6 border-b-2 border-gray-400">
              {forecastDays.map((day, idx) => {
                const {
                  date,
                  day: {
                    maxtemp_c,
                    mintemp_c,
                    condition: { text: conditionText, icon: conditionIcon },
                  },
                } = day
                const d = new Date(date)
                const dayName = days[d.getDay()]
                const dateNum = d.getDate()

                return (
                  <div className="items center flex items-center border-t-2 border-gray-400">
                    <p className="w-20 text-left text-sm">{`${dayName}, ${dateNum}`}</p>
                    <p className="text-sm">
                      <span className="text-2xl">{`${maxtemp_c}°`}</span>
                      {`/${mintemp_c}° C`}
                    </p>
                    <div className="ml-auto">
                      <img
                        src={conditionIcon}
                        alt={conditionText}
                        className="h-auto w-[60px]"
                      />
                    </div>
                    <p className="w-40 text-right text-sm">{conditionText}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default CurrentWeather
