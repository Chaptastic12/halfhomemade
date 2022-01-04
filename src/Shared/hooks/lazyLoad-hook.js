import { useState, useEffect } from 'react';

import defaultImage from '../Img/Food/webp/loadingImage.webp'

const useProgressiveImage = src => {  
    const [sourceLoaded, setSourceLoaded] = useState(defaultImage)
  
    useEffect(() => {
      const img = new Image()
      img.src = src
      img.onload = () => setSourceLoaded(src)
    }, [src])
  
    return sourceLoaded 
}

export default useProgressiveImage
