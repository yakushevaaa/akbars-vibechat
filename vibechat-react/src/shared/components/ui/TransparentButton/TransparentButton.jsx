export const TransparentButton = ({ children, ...props }) => {
  return (
    <button className="empty-list__add-button" {...props}>
      {children}
    </button>
  );
};
