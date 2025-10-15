import React, { useCallback } from 'react'
import SearchBar from '../components/image/SearchBar'
import ImageList from '../components/image/ImageList'
import { searchImages, getLatestImages } from '../services/searchImageService'

const ImagePage = () => {
  const [images, setImages] = React.useState([]);

  const handleSearchSubmit = useCallback(async (term) => {
    try {
      let response;
      if (!term.trim()) {
        response = await getLatestImages();
        setImages(response.data);
      } else {
        response = await searchImages(term);
        setImages(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      <ImageList images={images} />
    </div>
  )
}

export default ImagePage