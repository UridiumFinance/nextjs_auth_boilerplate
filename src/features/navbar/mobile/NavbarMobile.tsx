import Button from "@/components/Button";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
}

interface ComponentProps {
  navigation: NavItem[];
  setMobileMenuOpen: any;
  mobileMenuOpen: boolean;
}

export default function NavbarMobile({
  navigation,
  setMobileMenuOpen,
  mobileMenuOpen,
}: ComponentProps) {
  return (
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="bg-color-main fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center gap-x-6">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <Button>Sign up</Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="text-color-text -m-2.5 rounded-md p-2.5"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-color-heading hover:bg-color-second -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <a
                href="#"
                className="text-color-heading hover:bg-color-second -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
