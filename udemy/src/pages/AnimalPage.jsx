import React, { useState } from 'react'
import AnimalList from '../components/animal/AnimalList';

const getRandomAnimals = () => {
    const animals = ['bird', 'cat', 'cow', 'gator', 'horse', 'dog'];
    return animals[Math.floor(Math.random() * animals.length)];
}

const AnimalPage = () => {
    const [animals, setAnimals] = useState([]);

    const handleAddAnimal = () => {
        setAnimals([...animals, getRandomAnimals()]);
    }
    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <button
                onClick={handleAddAnimal}
                className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow font-semibold hover:bg-blue-700 transition"
            >
                Add animal
            </button>
            <p className="mb-6 text-lg text-blue-700 font-medium">Number of animals: {animals.length}</p>
            <AnimalList animals={animals} />
        </div>
    )
}

export default AnimalPage