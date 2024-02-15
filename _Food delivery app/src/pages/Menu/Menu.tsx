import axios, { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import SearchInput from '../../components/SearchInput/SearchInput';
import Title from '../../components/Title/Title';
import styles from './Menu.module.css';
import MenuList from '../../components/MenuList/MenuList';


const Menu = () => {
	
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();
 

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			//console.log(axios.get<Product[]>(`${PREFIX}/products`));
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
			setProducts(data);
			//console.log(data);
			setIsLoading(false);
		} catch(error) {
			setIsLoading(false);
			if (error instanceof AxiosError) {
				setError(error.message);
			}
			console.error(error);
			return;
		}
	};

	// const getMenu = async () => {
	// 	try {
	// 		const res = await fetch(`${PREFIX}/products`);
	// 		if (!res.ok) {
	// 			return;
	// 		}
	// 		const products = await res.json() as Product[];
	// 		setProducts(products);
	// 	} catch (error) {
	// 		console.error(error);
	// 		return;
	// 	}
	// };

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};
	
	return (
		<>
			<div className={styles.header}>
				<Title>Menu</Title>
				<SearchInput placeholder='Find your dish' onChange={updateFilter}></SearchInput>
			</div>
			<div className={styles.menuContainer}>
				{error && <h2 style={{color: 'red'}}>{error}</h2>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{!isLoading && products.length === 0 && <>No dishes for your request</>}
				{isLoading && <h2>Loading menu...</h2>}
			</div>
		</>
	);
};

export default Menu;