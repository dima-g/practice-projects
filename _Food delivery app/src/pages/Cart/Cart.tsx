import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Cart.module.css';
import { AppDispatch, RootState } from '../../store/store';
import { Product } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import Title from '../../components/Title/Title';
import CartItem from '../../components/CartItem/CertItem';
import Button from '../../components/Button/Button';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 35;

const Cart = () => {
	const items = useSelector((state: RootState) => state.cart.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	
	const total = items.map(item => {
		const product = cartProducts.find(product => item.id === product.id);
		if (!product) {
			return 0;
		}
		return item.count * product.price;
	}).reduce((acc, i) => acc += i, 0);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(item => getItem(item.id)));
		setCartProducts(res);
	};

	const checkOut = async () => {
		axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartActions. cleanCart());
		navigate('/success');
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);
	
	return (
		<>
			<Title className={styles.heading}>Cart</Title>
			{items.map(item => {
				const product = cartProducts?.find(product => product.id === item.id);
				if (!product) {
					return; 
				}
				return <CartItem key={product.id} count={item.count} {...product}/>;
			})}
			<div className={styles.line}>
				<div className={styles.text}>Your order</div>
				<div className={styles.price}>{total}&nbsp;<span>lei</span></div>
			</div>
			<hr className={styles.hr}/>
			<div className={styles.line}>
				<div className={styles.text}>Delivery</div>
				<div className={styles.price}>{DELIVERY_FEE}&nbsp;<span>lei</span></div>
			</div>
			<hr className={styles.hr}/>
			<div className={styles.line}>
				<div className={styles.text}>Total <span className='totalCount'>({items.length})</span></div>
				<div className={styles.price}>{total + DELIVERY_FEE}&nbsp;<span>lei</span></div>
			</div>
			<div className={styles.checkout}>
				<Button appearence="big" onClick={checkOut}>Check out</Button>
			</div>
		</>
	);
};

export default Cart;