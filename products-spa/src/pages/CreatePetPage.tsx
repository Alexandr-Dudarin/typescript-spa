import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPet } from '../features/pets/petsSlice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';
import Button from '../features/ui/button';
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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = '44px';
    el.style.height = el.scrollHeight + 'px';
  };

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
    <form onSubmit={handleSubmit(onSubmit)} className="pet-form">
      <h1>Create pet</h1>

      <div className="form-row">

        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="Title"
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
          />
          {errors.title && (
            <p className="form-error">{errors.title.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            placeholder="Image URL"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && (
            <p className="form-error">{errors.image.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            {...register('description', {
              required: 'Description is required',
            })}
            ref={(e) => {
              register('description').ref(e);
              textareaRef.current = e;
            }}
            onInput={autoGrow}
          />

          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        <Button type="submit" variant="primary">
          Create
        </Button>

      </div>
    </form>
  );

};

export default CreatePetPage;