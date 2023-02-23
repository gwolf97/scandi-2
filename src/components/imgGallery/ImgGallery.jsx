import React from 'react'
import "./imgGallery.css"

const ImgGallery = ({setSelectedImg, gallery}) => {
  return (
    <div className='y-gallery-container'>
        {gallery.map(img => 
            (
            <div key={img}  className='y-img-container'>
                <img onClick={() => setSelectedImg(img)} className="y-img" src={img} alt="product gallery"/>
            </div>
            )
        )}
    </div>
  )
}

export default ImgGallery