import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import PetsPage from '../pages/PetsPage';
import PetPage from '../pages/PetPage';
import CreatePetPage from '../pages/CreatePetPage';

const AppRouter = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/pets" />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route path="/pets/:id" element={<PetPage />} />
      <Route path="/create-pet" element={<CreatePetPage />} />
    </Route>
  </Routes>
);

export default AppRouter;
