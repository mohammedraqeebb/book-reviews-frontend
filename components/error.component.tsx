import React, { FC } from 'react';
type ErrorFormat = {
  message: string;
  field?: string;
};

type ErrorComponentProps = {
  errors: ErrorFormat[];
};
const ErrorComponent: FC<ErrorComponentProps> = ({ errors }) => {
  return (
    <div
      style={{
        padding: '2px',
        textAlign: 'left',
        width: 'auto',
        maxWidth: '100%',
        fontSize: 10,
        fontWeight: 600,
        marginTop: '-10px',
        color: '#fb3460',
      }}
    >
      <p>{errors[0].message}</p>
    </div>
  );
};

export default ErrorComponent;
