import cn from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

//Alternative version
//export const ButtonAlt: FC<ButtonProps> = ( {children, className, ...props} : ButtonProps) ...

function Button( {children, className, appearence = 'small', ...props} : ButtonProps) {

	return (
		<button className = {cn(styles['button'], styles['accent'], className, {
			[styles['small']]: appearence === 'small',
			[styles['big']]: appearence === 'big'
		})} {...props}>{children}</button>
	);
}
  
export default Button;