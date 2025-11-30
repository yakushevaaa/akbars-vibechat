export const CustomInput = ({ errorId, className = "", ...props }) => {
  return (
    <>
      <input className={`${className}`} {...props} />
      {errorId && <p id={errorId} className="form__error" />}
    </>
  );
};
