import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import cn from 'classnames';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button'; 
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';

const MenuLayout = () => {
	
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);
	const items = useSelector((state: RootState) => state.cart.items);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logOut = () => {
		dispatch(userActions.removeJWT());
		navigate('/auth/login');
	};
	
	return (
		<div className={styles.layout}>
			<div className={styles.leftSidebar}>
				<div className={styles.user}>
					<img className={styles.avatar} src="/avatar.png" alt="user avatar" />
					<div className={styles.name}>{profile?.name}</div>
					<div className={styles.email}>{profile?.email}</div>
				</div>
				<div className={styles.menu}>
					<NavLink to="/" className={({isActive}) => cn(styles.link, {
						[styles.active]: isActive
					})}>
						<img src="/menu-icon.svg" alt="menu icon" />
						Menu
					</NavLink>
					<NavLink to="/cart" className={({isActive}) => cn(styles.link, {
						[styles.active]: isActive
					})}>
						<img src="/cart-icon.svg" alt="cart icon" />
						Cart <span className={styles.cartCount}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
					</NavLink>
				</div>
				<Button appearence='small' className={styles.exit} onClick={() => logOut()}>
					<img src="/exit-icon.svg" alt="exit icon" />
						Log out
				</Button>
			</div>
			<div className={styles.rightSidebar}>
				<Outlet />
			</div>
		</div>
	);
};

export default MenuLayout;