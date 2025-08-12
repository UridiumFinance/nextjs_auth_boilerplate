import { logout } from "@/redux/actions/auth/actions";
import { RootState } from "@/redux/reducers";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export default function AuthLinks() {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          <Image
            className="h-10 w-auto"
            src={user?.profile_picture}
            width={512}
            height={512}
            alt="profile-picture"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="divide-color-border bg-color-main text-color-text ring-color-border absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md p-1 shadow-lg ring-1 transition-colors focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
      >
        <div className="px-4 py-3">
          <p className="text-color-subtext text-sm">Signed in as</p>
          <p className="text-color-heading truncate text-sm font-medium">{user?.username}</p>
        </div>

        <div className="py-1">
          <MenuItem>
            <Link
              href="/profile"
              className="text-color-text hover:bg-color-second hover:text-color-heading data-[focus]:bg-color-second data-[focus]:text-color-heading block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors data-[focus]:outline-none"
            >
              Account settings
            </Link>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <button
              type="button"
              onClick={handleLogout}
              className="text-color-text hover:bg-color-second hover:text-color-heading data-[focus]:bg-color-second data-[focus]:text-color-heading block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors data-[focus]:outline-none"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
