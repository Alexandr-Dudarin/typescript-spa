import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addPet } from '../features/pets/petsSlice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';
import './CreatePetPage.css';

interface FormData {
  title: string;
  description: string;
  image: string;
}

const CreatePetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(
      addPet({
        id: Date.now().toString(),
        liked: false,
        ...data,
      })
    );
    navigate('/pets');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create pet</h1>

      <input
        {...register('title', {
          required: 'Title is required',
          pattern: {
            value: /^[^@!?%$]+$/,
            message: 'Title contains forbidden characters',
          },
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
        })}
        placeholder="Title"
      />
      {errors.title && (
        <p className="form-error">
          {errors.title.message}
        </p>
      )}
      <input {...register('image', { required: true })} placeholder="Image URL" />
      <textarea {...register('description', { required: true })} placeholder="Description" />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePetPage;
