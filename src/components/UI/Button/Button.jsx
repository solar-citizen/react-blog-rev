import styles from './Button.module.css';

const Button = ({ onClick, children, type, disabled, size }) => {
  const cls = [styles.Button, styles[type]];

  if (size === 'small') {
    cls.push(styles.btnSmall);
  }

  return (
    <button
      type={type ? type : 'button'}
      className={cls.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
