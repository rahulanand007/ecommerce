import React from 'react'
import profileicon from '../../images/profileicon.png'
import { Rating } from '@mui/material'

const RevieCard = ({review}) => {

    const options = {
        size:"large",
        value: review.rating,
        readOnly: true,
        precision:0.5
      }

  return (
    <div className='reviewCard'>
        <img src={profileicon} alt="user"/>
        <p>{review.name}</p>
        <Rating {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default RevieCard