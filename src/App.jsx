
import Home from './pages/home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/login'
import List from './pages/list/List'
import Single from './pages/single/single'
import New from './pages/new/New'

function App() {

  return (
<div className="App">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/users'>
      <Route index element={<List/>}/>
      <Route path=':userid' element={<Single/>}/>
      <Route path='new' element={<New/>}/>
      
    </Route>
  </Routes>
  </BrowserRouter>
</div>

  )
}

export default App
