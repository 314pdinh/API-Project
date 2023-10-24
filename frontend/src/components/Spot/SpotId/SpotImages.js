import React from "react";

function SpotImages({ spot }) {
  const { SpotImages } = spot;

  return (
    <div className='images'>
      <div className='img1'>
        {SpotImages && SpotImages[0] && (
          <img src={SpotImages[0].url} alt='AirBnb' />
        )}
      </div>
      <div className='img2'>
        {SpotImages &&
          SpotImages.slice(1, 5).map(image => (
            <img key={image.id} src={image.url} alt='AirBnb' />
          ))}
      </div>
    </div>
  );
}

export default SpotImages;