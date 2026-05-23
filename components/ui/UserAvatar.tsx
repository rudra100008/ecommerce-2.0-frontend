import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

export default function UserAvatar() {
  const user = useAuthStore((state) => state.user);

  if (user?.imageUrl) {
    return (
      <Image
        src={user.imageUrl}
        alt={user.username}
        width={60}
        height={60}
        className="cursor-pointer rounded-full object-cover w-9 h-9 border-2 border-white/20 hover:border-white/40 transition-colors"
      />
    );
  }
  return (
    <div
      className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium text-accent 
    bg-accent-light border-2 border-accent/20 hover:border-accent/40 transition-colors"
    >
      {user?.fullName.substring(0, 2).toLocaleUpperCase()}
    </div>
  );
}
