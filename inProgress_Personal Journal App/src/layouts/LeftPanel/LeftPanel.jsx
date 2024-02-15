import styles from './LeftPanel.module.css';

function LeftPanel({ children }) {
	return (
		<div className={styles.leftPanel}>
			{children}
		</div>
	);
}

export default LeftPanel;