import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import GuestLinks from "./GuestLinks";
import AuthLinks from "./AuthLinks";

interface NavItem {
  name: string;
  href: string;
}

interface ComponentProps {
  navigation: NavItem[];
  setMobileMenuOpen: any;
}

export default function NavbarDesktop({ navigation, setMobileMenuOpen }: ComponentProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <nav
      aria-label="Global"
      className="text-color-text mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 transition-colors lg:px-8"
    >
      <div className="flex lg:flex-1">
        <Link
          href="/"
          className="hover:bg-color-second focus-visible:outline-color-primary -m-1.5 rounded-md p-1.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <span className="sr-only">Your Company</span>
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map(item => (
          <a
            key={item.name}
            href={item.href}
            className="text-color-heading hover:text-color-primary text-sm/6 font-semibold transition-colors"
          >
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-end gap-x-6">
        {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
      </div>

      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="text-color-text hover:bg-color-second focus-visible:outline-color-primary -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
    </nav>
  );
}
