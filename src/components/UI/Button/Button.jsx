import styles from './Button.module.css';

const Button = ({
  onClick,
  children,
  type,
  category,
  disabled,
  size,
  active,
}) => {
  const cls = [styles.Button, styles[category]];

  if (size === 'small') {
    cls.push(styles.btnSmall);
  }

  if (size === 'x-small') {
    cls.push(styles.btnXSmall);
  }

  if (active) {
    cls.push(styles.active);
  }

  return (
    <button
      type={type || 'button'}
      category={category || ''}
      className={cls.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
