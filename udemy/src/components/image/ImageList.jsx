import ImageShow from './ImageShow';

const ImageList = ({ images }) => {
    const renderedImages = images.map((image) => {
        return <ImageShow key={image.id} image={image} />
    });
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {renderedImages}
        </div>
    )
}

export default ImageList