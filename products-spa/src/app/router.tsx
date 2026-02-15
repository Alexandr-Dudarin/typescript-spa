import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react'
import Layout from '../layout/Layout';
import PetsPage from '../pages/PetsPage';
import PetPage from '../pages/PetPage';
import CreatePetPage from '../pages/CreatePetPage';

const AppRouter = () => {
  useEffect(() => {
    const redirect = new URLSearchParams(window.location.search).get('redirect')

    if (redirect) {
      window.history.replaceState(null, '', redirect)
    }
  }, [])
  return (<Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/pets" />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route path="/pets/:id" element={<PetPage />} />
      <Route path="/create-pet" element={<CreatePetPage />} />
    </Route>
  </Routes>
)
}

export default AppRouter;