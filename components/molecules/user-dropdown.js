import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSession, signOut } from 'next-auth/client'
import { classNames } from '@/lib/style-utils.js'

export default function UserDropdown() {
  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession()

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-gray-100 rounded-full flex items-center focus:outline-none">
              <span className="sr-only">User options</span>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={session.user.image}
                alt={session.user.name}
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleSignout}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'cursor-pointer block px-4 py-2 text-sm'
                      )}
                    >
                      ログアウト
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
