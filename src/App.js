import './App.css';
import { Home } from './Components/Home';
import { useFetchLocation } from './utils/global.utils';

function App() {
  const location = useFetchLocation();

  return (
    <div className="App">
      <header className="App-header" >
        <Home location={location}/>
      </header>
    </div>
  );
}

export default App;
