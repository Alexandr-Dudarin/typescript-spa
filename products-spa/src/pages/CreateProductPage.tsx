import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';

interface FormData {
  title: string;
  description: string;
  image: string;
}

const CreateProductPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(
      addProduct({
        id: Date.now().toString(),
        liked: false,
        ...data,
      })
    );
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create product</h1>

      <input {...register('title', { required: true })} placeholder="Title" />
      <input {...register('image', { required: true })} placeholder="Image URL" />
      <textarea {...register('description', { required: true })} placeholder="Description" />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProductPage;
