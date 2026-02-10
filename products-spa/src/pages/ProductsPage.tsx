import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector((s: RootState) =>
    s.products.items.find(p => p.id === id)
  );

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <button onClick={() => navigate('/products')}>Back</button>

      <h2>{product.title}</h2>
      <img src={product.image} width={200} />
      <p>{product.description}</p>
    </div>
  );
};

export default ProductPage;
