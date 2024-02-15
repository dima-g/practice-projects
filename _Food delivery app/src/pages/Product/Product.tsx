import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

const Product = () => {
	const product = useLoaderData() as Product;
    
	return (
		<div>Product: {product.name}</div>
	);
};

export default Product;