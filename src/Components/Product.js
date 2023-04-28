import React from 'react'

const Product = ({id,title}) => {
  return (
    <div key={id}>{title}</div>
  )
}

export default Product