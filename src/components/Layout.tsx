import { type ReactNode } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import { Popover } from "@headlessui/react";
import clsx from "clsx";

import {
  Bars3Icon,
  ClipboardIcon,
  // HomeIcon,
  XMarkIcon,
  CalendarDaysIcon,
  // UserGroupIcon,
  // ChatBubbleLeftEllipsisIcon,
  // ShoppingCartIcon,
} from "@heroicons/react/24/outline";

type LayoutProps = {
  children?: ReactNode;
};

const navigation = [
  // { name: 'Home', href: '/', icon: HomeIcon, },
  { name: "Trainings", href: "/training/list", icon: ClipboardIcon },
  { name: "Training dates", href: "/training/dates", icon: CalendarDaysIcon },
  // { name: 'Inquiries', href: '/inquiries', icon: ShoppingCartIcon, },
  // { name: 'Contacts', href: '/contacts', icon: UserGroupIcon, },
  // { name: 'Feedback', href: '/feedback', icon: ChatBubbleLeftEllipsisIcon, },
];

type IsOpenType = { open: boolean };

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const onSignOut = () => {
    if (session) {
      signOut();
    }
  };

  return (
    <>
      <div className="min-h-full">
        {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
        <Popover
          as="header"
          className={({ open }: IsOpenType) =>
            clsx(
              open ? "fixed inset-0 z-40 overflow-y-auto" : "",
              "bg-white shadow-sm lg:static lg:overflow-y-visible"
            )
          }
        >
          {({ open }: IsOpenType) => (
            <>
              <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-6 ">
                  <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2 ">
                    <div className="flex flex-shrink-0 items-center">
                      <p className="text-2xl font-bold">
                        Training{" "}
                        <span className="rounded bg-orange-500 py-1 px-2">
                          Hub
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 ">
                    {/* <Button
                      color='blue'
                      href="#"
                    >
                      New training date
                    </Button> */}

                    <button
                      className="shaddow-sm focus:ring-offset-2bg-white inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-bold text-red-700 ring-2 ring-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                      onClick={onSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={
                        router.pathname.startsWith(item.href)
                          ? "page"
                          : undefined
                      }
                      className={clsx(
                        router.pathname.startsWith(item.href)
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="mx-auto mt-3 max-w-3xl space-y-6 px-4 sm:px-6">
                    {/* <Button
                      color="gray"
                      href="#"
                      className="w-full justify-center"
                    >
                      New training date
                    </Button> */}
                    <button
                      className="shaddow-sm focus:ring-offset-2bg-white inline-flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-bold text-red-700 ring-2 ring-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                      onClick={onSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
        <div className="py-10">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="space-y-1 pb-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        router.pathname === item.href
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:bg-gray-50",
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={
                        router.pathname === item.href ? "page" : undefined
                      }
                    >
                      <item.icon
                        className={clsx(
                          router.pathname === item.href
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
