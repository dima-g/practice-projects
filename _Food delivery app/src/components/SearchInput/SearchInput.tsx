import { forwardRef } from 'react';
import { SearchInputProps } from './SearchInput.props';
import styles from './SearchInput.module.css';
import cn from 'classnames';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function Input({ isValid = true, className, ...props }, ref) {
	return (
		<div className={styles.divWrapper}>
			<input ref={ref} 
				className={(cn(styles['input'], className, {
					[styles['invalid']]: isValid
				}))} 
				{...props} 
			/>
			<img className={styles.img} src="/search-icon.svg" alt="search-icon" />
		</div>
	);
});

export default SearchInput;