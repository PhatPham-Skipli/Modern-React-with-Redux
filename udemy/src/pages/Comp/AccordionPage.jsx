import React from 'react'
import Accordion from '../../components/accordion/Accordion'

const AccordionPage = () => {
    const items = [
        {
            id: '1',
            label: 'What is React?',
            content: 'React is a JavaScript library for building user interfaces.'
        },
        {
            id: '2',
            label: 'Why use React?',
            content: 'React is a favorite JS library among engineers.'
        },
        {
            id: '3',
            label: 'How do you use React?',
            content: 'You use React by creating components.'
        }
    ]
  return (
    <div>
        <Accordion items={items} />
    </div>
  )
}

export default AccordionPage