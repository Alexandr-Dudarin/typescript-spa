import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import './PetPage.css';


const PetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pet = useSelector((s: RootState) =>
    s.pets.items.find(p => p.id === id)
  );

  if (!pet) return <div>Pet not found</div>;

  return (
    <div>
      <button onClick={() => navigate('/pets')}>Back</button>

      <h2>{pet.title}</h2>
      <img src={pet.image} className="pet-page__image" />
      <p>{pet.description}</p>
    </div>
  );
};

export default PetPage;
