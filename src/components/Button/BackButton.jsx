import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button
    className="btn btn--back"
    tyoe="back"
    onClick={(e) => {
      e.preventDefault();
      navigate(-1);
    }}
  >
    &larr; Back
  </button>
  )
}

export default BackButton