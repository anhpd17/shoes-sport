import React from 'react'

type Props = {
    description: string
}
const ProductDescription = ({ description }: Props) => {
    return (
        <div className='text-sm'>{description}</div>
       
    )
}

export default ProductDescription
