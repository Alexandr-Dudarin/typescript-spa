import type { Product } from '../features/products/types';
import { useDispatch } from 'react-redux';
import { toggleLike, deleteProduct } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      style={{
        border: '1px solid #ccc',
        padding: 12,
        cursor: 'pointer',
      }}
    >
      <img src={product.image} alt="" width={100} />

      <h3>{product.title}</h3>

      <p
        style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.description}
      </p>

      <button
        onClick={e => {
          e.stopPropagation();
          dispatch(toggleLike(product.id));
        }}
      >
        {product.liked ? '❤️' : '🤍'}
      </button>

      <button
        onClick={e => {
          e.stopPropagation();
          dispatch(deleteProduct(product.id));
        }}
      >
        🗑
      </button>
    </div>
  );
};

export default ProductCard;
