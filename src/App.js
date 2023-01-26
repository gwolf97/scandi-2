import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {HomeScreen, ProductScreen, CartScreen} from "./screens/index.js"
import {Nav} from "./components/index.js"

function App() {

  return (
    <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/:category" element={<HomeScreen/>}/>
          <Route path="/:category/:id" element={<ProductScreen/>}/>
          <Route path="/cart" element={<CartScreen/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
