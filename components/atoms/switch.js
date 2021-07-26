import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { classNames } from '@/lib/style-utils.js'

export default function SwitchColorMode() {
  const { theme, setTheme } = useTheme()
  const isLight = (theme === 'light')
  const [enabled, setEnabled] = useState(isLight)
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const changeTheme = () => {
    if (enabled) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
    setEnabled(!enabled)
  }

  return (
    <>
      {!loading && <Switch
        checked={enabled}
        onChange={changeTheme}
        className={classNames(
          isLight ? 'bg-yellow-400' : 'bg-gray-800',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-white dark:border-green-400 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
        )}>
        <span className="sr-only">Dark Mode</span>
        <span
          aria-hidden="true"
          className={classNames(
            isLight ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}>
          { isLight ? <SunIcon className="h-5 w-5 text-yellow-400"/> : <MoonIcon className="h-5 w-5 text-green-400"/>}
        </span>
      </Switch>}
    </>
  )
}
