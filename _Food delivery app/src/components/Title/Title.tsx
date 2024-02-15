import { TitleProps } from './Title.props';
import styles from './Title.module.css';

const Title = ({ children, ...props }: TitleProps) => {
	return (
		<h1 className={styles.pageTitle} {...props }>{children}</h1>
	);
};

export default Title;