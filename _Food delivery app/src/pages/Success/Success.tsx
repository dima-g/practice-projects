import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

const Success = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.success}>
			<img src="/pizza-image.png" alt="Pizza image" />
			<div className={styles.text}>Your order wass registered successfully</div>
			<Button appearence='big' onClick={() => navigate('/')}>Place new order</Button>
		</div>
	);
};

export default Success; 