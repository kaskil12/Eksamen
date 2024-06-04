import { Outlet } from "react-router";
import "./App.css";
import { Header } from "./prefabs/Header";
import { Background } from "./prefabs/Background";
import Footer from "./prefabs/Footer";

function App() {
  return (
    <div>
      <Background />
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}
export default App;
