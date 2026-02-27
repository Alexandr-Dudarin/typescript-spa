import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
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
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const imageUrl = watch('image');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const [imageBase64, setImageBase64] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setPreview('');
      setImageBase64('');
      setFileError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl && !imageBase64) {
      setPreview(imageUrl);
    }
  }, [imageUrl, imageBase64]);

  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = '44px';
    el.style.height = el.scrollHeight + 'px';
  };

  const MAX_SIZE = 5 * 1024 * 1024;

  const processFile = (file: File) => {
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };


  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    processFile(file);
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
            disabled={!!imageBase64}
            {...register('image', {
              validate: value =>
                imageBase64 || value ? true : 'Image is required',
            })}
          />
          {errors.image && <p className="form-error">{errors.image.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="file">Upload image</label>
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''} ${imageUrl ? 'disabled' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={() => {
              if (!imageUrl) fileInputRef.current?.click();
            }}
          >
            <p>
              {imageUrl
                ? 'Image upload disabled because URL is provided'
                : isDragging
                  ? 'Drop image here'
                  : 'Drag & drop image here or click to upload'}
            </p>

            <input
              ref={fileInputRef}
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={!!imageUrl}
              hidden
            />
          </div>
          {fileError && <p className="form-error">{fileError}</p>}
        </div>

        {preview && (
          <div className="form-field">
            <p>Preview:</p>

            <img src={preview} className="image-preview" alt="Preview" onError={() => setPreview('')} />

            <Button
              type="button"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
            >
              Replace image
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setPreview('');
                setImageBase64('');
                setFileError(null);
                setValue('image', '');
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