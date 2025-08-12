import { RootState } from "@/redux/reducers";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Heading() {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <div>
        <Image
          height={720}
          width={1280}
          alt=""
          src={profile?.banner_picture}
          className="h-32 w-full object-cover lg:h-48"
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              height={512}
              width={512}
              alt=""
              src={user?.profile_picture}
              className="size-24 rounded-full ring-4 ring-white sm:size-32"
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{user?.username}</h1>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{user?.username}</h1>
        </div>
      </div>
    </div>
  );
}
