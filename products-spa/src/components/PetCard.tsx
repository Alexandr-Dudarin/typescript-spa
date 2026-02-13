import type { Pet } from '../features/pets/types';
import { useDispatch } from 'react-redux';
import { toggleLike, deletePet } from '../features/pets/petsSlice';
import { useNavigate } from 'react-router-dom';
import './PetCard.css';


interface Props {
  pet: Pet;
}

const PetCard = ({ pet }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="pet-card"
      onClick={() => navigate(`/pets/${pet.id}`)}
    >
      <img src={pet.image}
        alt={pet.title}
        className="pet-card__image" />

      <div className="pet-card__content">
        <h3>{pet.title}</h3>

        <p className="pet-card__description">
          {pet.description}
        </p>

        <div className="pet-card__actions">
          <button
            onClick={e => {
              e.stopPropagation();
              dispatch(toggleLike(pet.id));
            }}
          >
            {pet.liked ? '❤️' : '🤍'}
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              dispatch(deletePet(pet.id));
            }}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
