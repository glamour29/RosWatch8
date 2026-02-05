import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/client/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Index</div>;
};

export default Index;
