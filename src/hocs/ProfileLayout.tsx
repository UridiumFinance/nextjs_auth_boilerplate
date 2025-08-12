import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import { Bars3Icon, CogIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface PageProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: PageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const { pathname } = router;
  const navigation = [{ name: "Account Settings", href: "/profile", icon: CogIcon }].map(item => ({
    ...item,
    current: item.href === pathname,
  }));

  return (
    <div className="text-color-text transition-colors">
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="text-color-heading size-6" />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar móvil */}
            <div className="bg-color-main flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 transition-colors">
              <div className="flex h-16 shrink-0 items-center">
                <Link href="/">
                  <Image
                    width={512}
                    height={512}
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map(item => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-color-second text-color-primary"
                                : "text-color-text hover:bg-color-second hover:text-color-primary",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-color-primary"
                                  : "text-color-subtext group-hover:text-color-primary",
                                "size-6 shrink-0",
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="border-color-border bg-color-main flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 transition-colors">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/">
              <Image
                width={512}
                height={512}
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-color-second text-color-primary"
                            : "text-color-text hover:bg-color-second hover:text-color-primary",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-color-primary"
                              : "text-color-subtext group-hover:text-color-primary",
                            "size-6 shrink-0",
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="-mx-6 mt-auto">
                <Link
                  href="/profile"
                  className="text-color-heading hover:bg-color-second flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold transition-colors"
                >
                  <Image
                    width={512}
                    height={512}
                    alt=""
                    src={user?.profile_picture}
                    className="bg-color-second size-8 rounded-full"
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">
                    {user?.first_name} {user?.last_name}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Top bar móvil */}
      <div className="bg-color-main sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm transition-colors sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="text-color-text hover:bg-color-second focus-visible:outline-color-primary -m-2.5 rounded-md p-2.5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="text-color-heading flex-1 text-sm/6 font-semibold">Dashboard</div>
        <Link href="/profile" className="rounded-full">
          <span className="sr-only">Your profile</span>
          <Image
            width={512}
            height={512}
            alt=""
            src={user?.profile_picture}
            className="bg-color-second size-8 rounded-full"
          />
        </Link>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
