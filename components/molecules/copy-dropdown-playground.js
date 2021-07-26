import { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ClipboardIcon, CheckIcon, CodeIcon, PhotographIcon, LinkIcon } from '@heroicons/react/solid'
import domtoimage from 'dom-to-image'

export default function CopyDropdownPlayground({ code }) {
  const [enableCopy, setEnableCopy] = useState(true)
  const pngId = 'playground'

  // Browser
  // eslint-disable-next-line no-unused-vars
  const [isSafari, setIsSafari] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isFirefox, setIsFirefox] = useState(false)
  useEffect(() => {
    setIsSafari(
      window.navigator.userAgent.indexOf('Safari') !== -1 &&
        window.navigator.userAgent.indexOf('Chrome') === -1)
    setIsFirefox(
      window.navigator.userAgent.indexOf('Firefox') !== -1 &&
        window.navigator.userAgent.indexOf('Chrome') === -1)
  }, []) 

  function copySnippet() {
    setEnableCopy(false)
    navigator.clipboard.writeText(code)
    setTimeout(() => { setEnableCopy(true) }, 500)
  }

  function copyURL() {
    setEnableCopy(false)
    navigator.clipboard.writeText('https://osushi.io/')
    setTimeout(() => { setEnableCopy(true) }, 500)
  }

  // function copyIframe() {
  //   navigator.clipboard.writeText(
  //     `<iframe
  //     src="https://osushi.io/"
  //     width="400px"
  //     height="400px"
  //     style="width:400px; height:400px; border:0; overflow:auto;"
  //     sandbox="allow-scripts allow-same-origin"
  //     scrolling="auto">
  //   </iframe>
  //   `
  //   )
  //   setEnableCopy(false)
  //   setTimeout(() => { setEnableCopy(true) }, 500)
  // }

  function copyPNG() {
    if (!isSafari) {
      setEnableCopy(false)
      domtoimage.toBlob(document.getElementById(pngId))
        .then(async (blob) => {
        
          if (navigator.clipboard) {
            await navigator.clipboard.write([
              new window.ClipboardItem({
                'image/png': blob ,
              }),
            ])
          }
          setTimeout(() => { setEnableCopy(true) }, 500)
        })
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="items-center focus:outline-none">
              <span className="sr-only">Open options</span>
              <div className="p-1 rounded-sm border-2 border-gray-600 dark:border-white">
                {enableCopy ? <ClipboardIcon 
                  className="h-6 w-6 text-gray-500 dark:text-gray-200 cursor-pointer"
                  aria-hidden="true"
                /> : <CheckIcon 
                  className="h-6 w-6 text-green-500 cursor-pointer"
                  aria-hidden="true"
                />}
              </div>
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
              className="text-sm sm:text-base z-40 origin-top-right absolute left-0 sm:right-0 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  <div
                    onClick={() => copySnippet()}
                    className='cursor-pointer flex items-center px-4 py-2 font-medium bg-white hover:bg-gray-200 text-gray-500'
                  >
                    <CodeIcon 
                      className="mr-3 h-5 w-5 text-gray-500"
                    />
                    スニペットコピー
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    onClick={() => copyURL()}
                    className='cursor-pointer flex items-center px-4 py-2 font-medium bg-white hover:bg-gray-200 text-gray-500'
                  >
                    <LinkIcon 
                      className="mr-3 h-5 w-5 text-gray-500"
                    />
                    URLコピー
                  </div>
                </Menu.Item>
                {/* <Menu.Item>
                  <div
                    onClick={() => copyIframe()}
                    className='cursor-pointer flex items-center px-4 py-2 font-medium bg-white hover:bg-gray-200 text-gray-500'
                  >
                    <CodeIcon 
                      className="mr-3 h-5 w-5 text-gray-500"
                    />
                    iFrameコピー(Beta)
                  </div>
                </Menu.Item> */}
                <Menu.Item>
                  <div
                    onClick={() => copyPNG()}
                    className='cursor-pointer flex items-center px-4 py-2 font-medium bg-white hover:bg-gray-200 text-gray-500'
                  >
                    <PhotographIcon 
                      className="mr-3 h-5 w-5 text-gray-500"
                    />
                    PNGコピー
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
