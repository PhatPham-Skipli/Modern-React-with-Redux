import React, { useState } from 'react'
import Field from '../components/translate/Field'
import Translate from '../components/translate/Translate'
import Language from '../components/translate/Language'

const TranslatePage = () => {
  const [language, setLanguage] = useState('es');
  const [text, setText] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto">
        <Field value={text} onChange={setText} />
        <Language language={language} onLanguageChange={setLanguage} />
        <hr className="my-6 border-gray-300" />
        <Translate language={language} text={text} />
      </div>
    </div>
  )
}

export default TranslatePage