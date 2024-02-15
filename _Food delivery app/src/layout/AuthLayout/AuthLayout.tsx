import { Outlet } from 'react-router-dom';
//import cn from 'classnames';
import styles from './AuthLayout.module.css';


const AuthLayout = () => {
	return (
		<div className={styles.authLayout}>
			<div className={styles.logo}>
				<img src="/logo.svg" alt="App logo" />
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;