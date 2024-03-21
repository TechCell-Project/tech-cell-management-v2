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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
            borderRadius: '10px',
          }}
        >
          <SignIn />
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
