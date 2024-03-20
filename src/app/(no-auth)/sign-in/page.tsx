import { ModeToggle } from '@/components/utils';
import { SignIn } from '@/modules/auth/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập - Techcell Dashboard',
  description: 'Đăng nhập - Techcell Dashboard',
};

const SignInPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full relative">
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
            borderRadius: '10px',
          }}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-1">
              Đăng nhập
            </h1>
            <span className="text-[14px]">Tiếp tục để đến với trang quản trị Techcell</span>

            <SignIn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
