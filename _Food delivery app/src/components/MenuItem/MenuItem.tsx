import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MouseEvent } from 'react';
import styles from './MenuItem.module.css';
import { MenuItemProps } from './MenuItem.props';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

const MenuItem = (props: MenuItemProps) =>  {
	const dispatch = useDispatch<AppDispatch>();
    
	const addItemToCart = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.addItem(props.id));
	};
    
	return (
		<Link to={`/product/${props.id}`} className={styles.link}> 
			<div id={`${props.id}`} className={styles.item}>
				<div style={{ backgroundImage: `url("${props.imgLink}")` }} className={styles.imageWrapper}>
					<button className={styles.addToCart}>    
						<img src="/add-to-cart-icon.svg" alt="add-to-cart icon" onClick = {addItemToCart}/>
					</button>
					<div className={styles.price}>{props.price}<span style={{ color: '#FE724C' }}>&nbsp;lei</span></div>
					<div className={styles.rating}>
						{props.rating}
						<img src="/star-icon.svg" alt="star icon" />
					</div>
				</div>
				<div className={styles.itemData}>
					<h2>{props.title}</h2>
					<p>{props.desc}</p>
				</div>
			</div>
		</Link>
	);
};

export default MenuItem;