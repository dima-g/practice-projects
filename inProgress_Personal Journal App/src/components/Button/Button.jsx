import styles from './Button.module.css';
import { memo } from 'react';

function Button({ children, onClick }) {
	console.log('Button');
	return (
		<button className={`${styles.button} ${styles.accent}`} onClick={onClick}>{children}</button>
	);
}

export default memo(Button);