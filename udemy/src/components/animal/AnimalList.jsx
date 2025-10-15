import React from 'react'
import AnimalShow from './AnimalShow';

const AnimalList = ({ animals }) => {
    const renderedAnimals = animals.map((animal, index) => {
        return <AnimalShow animal={animal} key={index} />;
    });
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {renderedAnimals}
        </div>
    )
}

export default AnimalList