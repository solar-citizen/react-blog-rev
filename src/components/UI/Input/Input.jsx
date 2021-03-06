import styles from './Input.module.css';
import { v4 as uuidv4 } from 'uuid';

const Input = (props) => {
  const cls = [styles.Input];
  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${uuidv4()}`;

  const isInvalid = ({ valid, touched, shouldValidate }) => {
    return !valid && shouldValidate && touched;
  };

  if (isInvalid(props)) {
    cls.push(styles.invalid);
  }

  const renderInput = () => {
    return inputType === 'textarea' ? (
      <textarea id={htmlFor} value={props?.value} onChange={props?.onChange} />
    ) : (
      <input
        type={inputType}
        id={htmlFor}
        value={props?.value}
        onChange={props?.onChange}
        min={props?.min}
        max={props?.max}
        onSubmit={props?.onSubmit}
      />
    );
  };

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props?.label}</label>

      {renderInput()}

      {isInvalid(props) && (
        <span>{props?.errorMessage || 'Enter correct value.'}</span>
      )}
    </div>
  );
};

export default Input;
