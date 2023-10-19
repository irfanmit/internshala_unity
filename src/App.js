// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Posts from './components/Posts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/post/:objectID" element={<Posts/>} />
      </Routes>
    </Router>
  );
}

export default App;
