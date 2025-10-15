import React from 'react'

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(120deg, #d4145a 0%, #fbb03b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <circle cx="25%" cy="40%" r="180" fill="#e94e77" opacity="0.3" />
          <circle cx="70%" cy="70%" r="220" fill="#fbb03b" opacity="0.2" />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold text-center mb-8 drop-shadow-lg">
          Build amazing<br />things
        </h1>
        <p className="text-white text-lg md:text-xl text-center mb-8 max-w-2xl font-medium drop-shadow">
          We're GitHub, the company behind the npm Registry and npm CLI. We offer those to the community for free, but our day job is building and selling useful tools for developers like you.
        </p>
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-6 drop-shadow-lg">
          Take your JavaScript<br />development up a notch
        </h2>
        <p className="text-white text-base md:text-lg text-center mb-10 max-w-xl drop-shadow">
          Get started today for free, or step up to npm Pro to enjoy a premium JavaScript development experience, with features like private packages.
        </p>
        <div className="flex gap-6 mt-2">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg shadow transition">
            Sign up for free
          </button>
          <button className="bg-white bg-opacity-20 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg shadow transition hover:bg-white hover:text-pink-600">
            Learn about Pro
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage