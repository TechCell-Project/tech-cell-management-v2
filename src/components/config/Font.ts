import localFont from 'next/font/local';

export const quickSandFont = localFont({
  src: [
    {
      path: '../../../public/fonts/Quicksand-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Quicksand-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Quicksand-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Quicksand-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Quicksand-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-quicksand',
});
