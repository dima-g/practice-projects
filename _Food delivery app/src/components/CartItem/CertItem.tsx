import { useDispatch } from 'react-redux';
import { MouseEvent } from 'react';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { CartItemProps } from './CartItem.props';
import styles from './CartItem.module.css';

const CartItem = (props: CartItemProps) =>  {
	const dispatch = useDispatch<AppDispatch>();
    
	const increaseQty = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.addItem(props.id));
	};

	const decreaseQty = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.removeItem(props.id));
	};

	const removeAll = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.removeAll(props.id));
	};
    
	return (
		<div id={`${props.id}`} className={styles.item}>
			<div className={styles.image} style={{ backgroundImage: `url("${props.image}")` }} ></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.currency}>{props.price}<span style={{ color: '#FE724C' }}>&nbsp;lei</span></div>
			</div>
			<div className={styles.actions}>
				<button className={styles.minus} onClick={decreaseQty}>    
					<img src="/minus-icon.svg" alt="remove item from cart" />
				</button>
				<div className={styles.qty}>{props.count}</div>
				<button className={styles.plus} onClick={increaseQty}>    
					<img src="/plus-icon.svg" alt="add item to cart" />
				</button>
				<button className={styles.removeAll} onClick={removeAll}>    
					<img src="/close-icon.svg" alt="remove all items from cart" />
				</button>
			</div>
		</div> 
	);
};

export default CartItem;