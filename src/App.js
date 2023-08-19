import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Todo from './Component/Todo';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element = {<Todo/>} />
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
