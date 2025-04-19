import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <Button
    tyoe="back"
    onClick={(e) => {
      e.preventDefault();
      navigate(-1);
    }}
  >
    &larr; Back
  </Button>
  )
}

export default BackButton