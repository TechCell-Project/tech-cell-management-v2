import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';

export const NotificationsItem = () => {
  return (
    <div className="flex items-start gap-5 w-full cursor-pointer relative py-3">
      <Avatar>
        <AvatarImage src={'https://github.com/shadcn.png'} alt="avatar" />
        <AvatarFallback>Av</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-[6px] items-start">
        <h5 className="line-clamp-3 text-[14px] font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolore quasi natus quis
          explicabo voluptas aperiam, doloremque voluptatum ea repellendus officia velit non itaque
          a dolorum. Cupiditate iste enim veritatis!
        </h5>
        <span className="text-[13px]">14 giờ trước</span>
      </div>
    </div>
  );
};
