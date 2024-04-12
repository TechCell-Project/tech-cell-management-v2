'use client';

import HashLoader from 'react-spinners/HashLoader';

const LoadingPage = () => {
  return (
    <div className="relative inset-0 bg-white">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
        <HashLoader color="#ee4949" loading={true} size={35} />
        <span className='text-sm'>Xin vui lòng chờ ...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
