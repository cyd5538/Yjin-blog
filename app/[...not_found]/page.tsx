import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className='w-4/5 mx-auto mt-20 flex flex-col justify-center items-center space-y-4'>
        <h1 className='text-6xl font-semibold text-white'>404</h1>
        <h3 className='text-2xl font-semibold text-white'>존재하지 않는 페이지입니다.</h3>
        <Link
            className='text-white hover:text-gray-300'
            href='/'
          >
            홈으로 돌아가기
        </Link>
      </div>
    </>
  );
}