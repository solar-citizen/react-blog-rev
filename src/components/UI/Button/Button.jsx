import styles from './Button.module.css';

const Button = ({ onClick, children, type, disabled }) => {
  const cls = [styles.Button, styles[type]];

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
