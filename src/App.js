import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {HomeScreen, ProductScreen, CartScreen} from "./screens/index.js"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/:id" element={<ProductScreen/>}/>
        <Route path="/cart" element={<CartScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
