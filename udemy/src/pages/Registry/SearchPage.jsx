import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistryContext from '../../context/RegistryContext'

const SearchPage = () => {
  const { term, packages, loading, error } = useContext(RegistryContext)
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">
        {loading
          ? 'Đang tìm kiếm...'
          : error
            ? error
            : term
              ? `${packages.length}+ packages found`
              : 'Tìm kiếm package'}
      </h2>
      <ul>
        {packages.map(pkg => (
          <li key={pkg.package.name} className="border-b py-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-xl font-semibold text-blue-700 cursor-pointer hover:underline"
                onClick={() => navigate(`/registry/detail/${pkg.package.name}`)}
              >
                {pkg.package.name}
              </span>
              {pkg.score?.detail?.exactMatch && (
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs ml-2">exact match</span>
              )}
            </div>
            <div className="text-gray-600">{pkg.package.description}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {pkg.package.keywords?.map(kw => (
                <span key={kw} className="bg-gray-100 px-2 py-1 rounded text-xs">{kw}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              <span>
                <b>{pkg.package.publisher?.username}</b>
              </span>
              <span>• {pkg.package.version}</span>
              <span>• {pkg.package.date?.slice(0, 10)}</span>
              <span>• {pkg.package.links?.repository && (
                <a href={pkg.package.links.repository} target="_blank" rel="noopener noreferrer" className="underline">Repo</a>
              )}</span>
              <span>• {pkg.package.links?.npm && (
                <a href={pkg.package.links.npm} target="_blank" rel="noopener noreferrer" className="underline">NPM</a>
              )}</span>
              <span>• {pkg.package.license}</span>
            </div>
          </li>
        ))}
      </ul>
      {!loading && packages.length === 0 && term && (
        <div className="text-gray-500 mt-8">Không tìm thấy package nào.</div>
      )}
    </div>
  )
}

export default SearchPage