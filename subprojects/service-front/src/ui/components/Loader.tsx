import React from 'react'

interface LoaderProps {
  banner: string
}

const Loader: React.FC<LoaderProps> = ({ banner }) => {
  return (
    <>
      <div className="pageloader gray-bg">
        <div className="loader">
          <span>{banner}</span>
          <div className="sp-hydrogen"></div>
        </div>
      </div>
    </>
  )
}

export default Loader
