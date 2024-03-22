'use client';

import ClockLoader from 'react-spinners/ClockLoader';

const LoadingPage = ({ loading }: { loading: boolean }) => {
  return (
    <div className="relative inset-0 bg-white">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
        <ClockLoader color="#ee4949" loading={loading} size={35} />
        <span>Xin vui lòng chờ ...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
