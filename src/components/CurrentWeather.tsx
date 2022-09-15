import { useState, useEffect } from 'react'
import { ForecastAPIResponse, Location } from '../APIResponeTypes'
import apiKey from '../apiKey.json'
import _ from 'lodash'
import Modal from './Modal'
import { IoClose } from 'react-icons/io5'
import { IconContext } from 'react-icons'

function CurrentWeather() {
  const [forecastWeather, setForecastWeather] = useState(
    {} as ForecastAPIResponse
  )
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

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
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey.key}&q=${location.lat},${location.long}&days=7`
    )
    const json = (await res.json()) as ForecastAPIResponse

    if (!_.isEmpty(json)) {
      setLoading(false)
    }
    setForecastWeather(json)
  }

  function weeklyForecastOnClick() {
    setShowModal(true)
  }

  console.log('<CurrentWeather />')

  if (loading) {
    return (
      <div
        id="current-weather"
        className="mx-auto flex h-[250px] w-[500px] flex-col items-center justify-center rounded-md bg-gradient-to-b from-sky-400 to-sky-300 p-8 text-white"
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
      className="mx-auto flex h-[250px] w-[500px] flex-col justify-center rounded-md bg-gradient-to-b from-sky-400 to-sky-300 p-8 text-white"
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
      <button
        className="mt-6 w-fit self-end rounded bg-gradient-to-l from-sky-600 to-sky-500 px-4 py-2 text-sm font-bold"
        onClick={weeklyForecastOnClick}
      >
        Weekly Forecast
      </button>

      {showModal ? (
        <Modal>
          <div className="w-[700px] rounded bg-gradient-to-b from-sky-200 to-sky-100 p-8 text-center">
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
