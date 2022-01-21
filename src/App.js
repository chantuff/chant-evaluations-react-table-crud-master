import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';
import { ALL_USERS_QUERY } from './Queries';

function App() {

  const { loading, data } = useQuery(ALL_USERS_QUERY);
  if (loading) {
    return <div>
      loading...
    </div>
  }
  return (

    <Routes>
      <Route path='/' element={<Home data={data} />} />
      <Route path='/edit/:id' element={<Edit users={data.allUsers} />} />
    </Routes>

  )
}
export default App;