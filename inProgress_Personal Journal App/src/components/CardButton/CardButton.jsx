import styles from './CardButton.module.css';

function CardButton({children, className, ...props}) {
	const cardButtonClass = `${styles['card-button']}` + (className ? ` ${className}` : '');

	return (
		<button className={cardButtonClass} {...props}>
			{children}
		</button>  
	);
}
  
export default CardButton;