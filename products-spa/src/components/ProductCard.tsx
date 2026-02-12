import type { Product } from '../features/products/types';
import { useDispatch } from 'react-redux';
import { toggleLike, deleteProduct } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';


interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product.image} 
      alt={product.title}
      className="product-card__image" />

      <h3>{product.title}</h3>

<p className="product-card__description">
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
