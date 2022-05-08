import React from 'react'
import { Carousel } from 'react-bootstrap'

const ImageSlide = ({ images }) => {
  return (
        <Carousel fade>
            { images.map((img)=> (
                <Carousel.Item key={img.id}>
                    <img
                    className="d-block w-100 rounded-3"
                    src={img.pet_image}
                    alt={img.id}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
  )
}

export default ImageSlide

