import React, { useState } from 'react';
import Modal from '../../components/comp/Modal';
import Button from '../../components/Button';

const ModalPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Modal Page</h1>
            <Button
                onClick={handleToggleModal}
                className="bg-blue-500 text-white hover:bg-blue-600"
            >
                {showModal ? 'Hide Modal' : 'Show Modal'}
            </Button>
            {showModal && <Modal onClose={handleToggleModal} />}
        </div>
    );
};

export default ModalPage;