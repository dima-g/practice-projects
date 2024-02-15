import { v4 as uuidv4 } from 'uuid';
import MenuItem from '../MenuItem/MenuItem';
import { MenuListProps } from './MenuList.props';

const MenuList = ({products}: MenuListProps) => {
	
	const randomID = (): string => uuidv4();
    
	return (
		products.map(product => {
			const uuid = randomID();
			return (<MenuItem 
				key={uuid}
				id={product.id} 
				title={product.name}
				desc={product.ingredients.join(', ')}
				rating={product.rating}
				price={product.price}
				imgLink={product.image}
			/>);

		})
        
	);
};

export default MenuList;