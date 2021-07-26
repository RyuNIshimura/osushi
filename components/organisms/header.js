import { Fragment } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Switch from '@/components/atoms/switch.js'
import UserDropdown from '@/components/molecules/user-dropdown.js'

const navigation = [
  { name: 'Home', href: '/' }
]

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession()

  const handleSignin = (e) => {
    e.preventDefault()
    signIn('github')
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <>
      <div className="bg-gray-700 shadow-lg">
        <Disclosure
          as="nav"
          className="bg-gray-700 dark:bg-gray-800 border-opacity-25 lg:border-none">
          {({ open }) => (
            <>
              <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-gray-400 lg:border-opacity-25">
                  <div className="px-2 flex items-center lg:px-0">
                    <div className="flex-shrink-0">
                      <Link href="/">
                        <a>
                          <h3 className="text-3xl">🍣</h3>
                        </a>
                      </Link>
                    </div>
                    <div className="hidden lg:block lg:ml-10">
                      <div className="flex space-x-4">
                        {navigation.map((item, itemIdx) => (
                          <Link key={`${item.name}-${itemIdx}`} href={item.href}>
                            <a
                              className="text-white border border-transparent hover:bg-gray-800 dark:hover:bg-gray-700 hover:bg-opacity-75 rounded-sm py-2 px-3 text-lg font-medium">
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                    <div className="hidden lg:block mx-3 my-auto">
                      <Switch />
                    </div>
                    <div className="hidden md:flex">
                      {session ? 
                        <UserDropdown />
                        :
                        <div
                          onClick={handleSignin}
                          className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-sm shadow-sm text-base font-medium text-gray-600 bg-gray-200 hover:bg-gray-300"
                        >
                          <svg className="h-6 w-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          ログイン
                        </div>
                      }
                    </div>
                  </div>
                  <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-700 dark:bg-gray-800 p-2 rounded-sm inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 dark:focus:ring-offset-green-300 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        session ? 
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={session.user.image}
                            alt={session.user.name}
                          /> :
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item, itemIdx) =>
                    itemIdx === 0 ? (
                      <Fragment key={item.name}>
                        <Link href={item.href}>
                          <a
                            className="bg-gray-700 dark:bg-gray-800 text-white block rounded-sm py-2 px-3 text-base font-medium">
                            {item.name}
                          </a>
                        </Link>
                      </Fragment>
                    ) : (
                      <Link key={item.name} href={item.href}>
                        <a
                          className="text-white hover:bg-gray-500 dark:hover:bg-gray-800 hover:bg-opacity-75 block rounded-sm py-2 px-3 text-base font-medium">
                          {item.name}
                        </a>
                      </Link>
                    )
                  )}
                  <Fragment>
                    {session ? 
                      <div
                        onClick={handleSignout}
                        className="cursor-pointer bg-gray-700 hover:bg-gray-500 dark:bg-gray-800 text-white block rounded-sm py-2 px-3 text-base font-medium"
                      >
                        ログアウト
                      </div>
                      :
                      <div
                        onClick={handleSignin}
                        className="cursor-pointer bg-gray-700 hover:bg-gray-500 dark:bg-gray-800 text-white block rounded-sm py-2 px-3 text-base font-medium"
                      >
                        ログイン
                      </div>
                    }
                  </Fragment>
                  <Fragment>
                    <div
                      className="bg-gray-700 dark:bg-gray-800 block py-2 px-3"
                    >
                      <Switch />
                    </div>
                  </Fragment>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
