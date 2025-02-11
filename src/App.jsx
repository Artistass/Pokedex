import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/Home/HomePage"
import FavoritesPage from "./Pages/Favorites/FavoritesPage"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Navigation from "./components/Navigation/Navigation"
import PokemonDetail from "./Pages/PokemonDetails/PokemonDetails"
import Licence from "./Pages/Licence/Licence"
import NotFound from "./Pages/NotFound/NotFound";
import './App.css'

function App() {

  return (
    <div>
        <Header/>
        <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/favorites" element={<FavoritesPage/>}/>
        <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
        <Route path="/licence" element={<Licence/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
        <Footer/>
    </div>
  )
}

export default App;
