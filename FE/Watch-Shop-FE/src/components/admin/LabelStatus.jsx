import React from 'react';

const LabelStatus = ({ type, children }) => {
  const generateClassByType = (type) => {
    const typeToClass = {
      accepted: 'bg-success',
      cancel: 'bg-error',
      waiting: 'bg-warning',
    };

    return typeToClass[type] || '';
  };

  return (
    <label
      className={`rounded-2xl text-center text-white font-semibold
       px-2 text-base py-1 uppercase ${generateClassByType(type)}`}
    >
      {children}
    </label>
  );
};

export default LabelStatus;
