import CurrentWeather from './components/CurrentWeather'

function App() {
  console.log('<App />')
  return (
    <div
      id="app-wrapper"
      className="flex h-screen w-screen items-center justify-center overflow-auto bg-gradient-to-b from-sky-200 to-sky-100"
    >
      <div id="app" className="container mx-auto">
        <CurrentWeather />
      </div>
    </div>
  )
}

export default App
