import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DetailPage = () => {
  const { name } = useParams()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`https://registry.npmjs.org/${name}`)
        setPkg(response.data)
      } catch (err) {
        setError('Không tìm thấy package')
      } finally {
        setLoading(false)
      }
    }
    if (name) fetchDetail()
  }, [name])

  if (loading) return <div className="p-8">Đang tải...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>
  if (!pkg) return null

  const latestVersion = pkg['dist-tags']?.latest
  const info = latestVersion ? pkg.versions[latestVersion] : {}

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-2">{pkg.name}</h2>
      <div className="mb-4 text-gray-600">{info.description}</div>
      <div className="mb-2">
        <span className="font-semibold">Phiên bản mới nhất:</span> {latestVersion}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Tác giả:</span> {info.author?.name || 'Không rõ'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">License:</span> {info.license}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Keywords:</span>{' '}
        {info.keywords?.map(kw => (
          <span key={kw} className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">{kw}</span>
        ))}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Homepage:</span>{' '}
        {info.homepage ? (
          <a href={info.homepage} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{info.homepage}</a>
        ) : 'Không có'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Repository:</span>{' '}
        {info.repository?.url ? (
          <a href={info.repository.url.replace(/^git\+/, '')} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{info.repository.url.replace(/^git\+/, '')}</a>
        ) : 'Không có'}
      </div>
      <div className="mt-6">
        <span className="font-semibold">Cài đặt:</span>
        <pre className="bg-gray-100 p-2 rounded mt-2">npm install {pkg.name}</pre>
      </div>
    </div>
  )
}

export default DetailPage