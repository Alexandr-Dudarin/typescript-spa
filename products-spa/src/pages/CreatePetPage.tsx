import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
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
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const [imageBase64, setImageBase64] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);

  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = '44px';
    el.style.height = el.scrollHeight + 'px';
  };

  const MAX_SIZE = 3 * 1024 * 1024;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setFileError('File must be less than 3MB');
      return;
    }

    setFileError(null);

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      setPreview(base64);
      setValue('image', '');
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = (data: FormData) => {
    const finalImage = imageBase64 || data.image;

    dispatch(
      addPet({
        id: Date.now().toString(),
        liked: false,
        title: data.title,
        description: data.description,
        image: finalImage,
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
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
            })}
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            placeholder="https://..."
            {...register('image', {
              validate: value =>
                imageBase64 || value ? true : 'Image is required',
            })}
          />
          {errors.image && <p className="form-error">{errors.image.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="file">Upload image</label>
          <input
            ref={fileInputRef}
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
          {fileError && <p className="form-error">{fileError}</p>}
        </div>

        {preview && (
          <div className="form-field">
            <p>Preview:</p>

            <img src={preview} className="image-preview" />

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPreview('');
                setImageBase64('');
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              Remove image
            </Button>
          </div>
        )}


        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            {...register('description', {
              required: 'Description is required',
            })}
            ref={e => {
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