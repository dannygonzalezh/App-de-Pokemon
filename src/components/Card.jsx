import React from 'react'
import '../sass/Card.scss';

const Card = ({name, img}) => {
  return (
    <div className='card'>
        <p className='card-name'>{name}</p>
        <div className='card-circle'></div>
        <img className='card-img' src={img} alt='pokemon img' />
    </div>
  )
}

export default Card