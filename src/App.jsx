
import Home from './pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/login'
import List from './pages/list/List'
import Single from './pages/single/single'
import New from './pages/new/New'
import { ThemeProvider } from './context/Context'

function App() {

  return (
    <ThemeProvider>
<div className="App">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/users'>
      <Route index element={<List/>}/>
      <Route path='analytics' element={<Single/>}/>
      <Route path='meet' element={<New/>}/>
      
    </Route>
  </Routes>
  </BrowserRouter>
</div>
</ThemeProvider>
  )
}

export default App
