import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import FetchAPI from './utils/FetchAPI'

function App(){

  return (
    <>
      <Navbar />
      <FetchAPI />
      <Footer />
    </>
  )
}

export default App