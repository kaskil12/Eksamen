import { Outlet } from 'react-router';
import './App.css';
import CookiesQuestion from './prefabs/CookiesQuestion';
import { Header } from './prefabs/Header';
import { Background } from './prefabs/Background';
import Footer from './prefabs/Footer';

function App() {
  return (
    <div>
      <Background />
      <Header />
      
      <Outlet />

      <CookiesQuestion />
      <Footer />
    </div>
  );
}
export default App;