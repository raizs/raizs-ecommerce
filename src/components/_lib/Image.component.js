import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = props => {
  const { width, height, alt, src } = props;

  return (
    <LazyLoadImage
      width={width}
      height={height}
      alt={alt}
      effect='blur'
      src={src} />
  );
}

export { Image };