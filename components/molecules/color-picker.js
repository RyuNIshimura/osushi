import { useState, Fragment } from 'react'
import { TwitterPicker } from 'react-color'
import { Popover, Transition } from '@headlessui/react'

export default function ColorPicker({
  isGradient,
  backgroundStyle,
  backgroundStyle2,
  parentCallback,
  parentCallback2,
  callbackSetGradient,
  imageUrl,
  callSetImageUrl
}) {
  const [selected, setSelected] = useState('color')

  const _handleChangeComplete = (color) => {
    parentCallback({ background: color.hex })
  }

  const _handleChangeComplete2 = (color) => {
    parentCallback2({ background: color.hex })
  }

  const _handleUploadImageUrl = (e) => {
    e.preventDefault()

    const file = e.target.files[0]
    callSetImageUrl(URL.createObjectURL(file))
  }

  const _handleResetImageUrl = () => {
    callSetImageUrl('')
  }

  return (
    <Popover as="div" className="relative inline-block text-left">
      {() => (
        <>
          <div>
            <Popover.Button className="flex items-center focus:outline-none">
              <span className="sr-only">Open options</span>
              <div
                id="color-picker-bt"
                className="p-4 rounded-sm border-2 border-gray-600 dark:border-white"
              />
              { isGradient ? <style jsx>{`
                  #color-picker-bt {
                    background-image: linear-gradient(to right, var(--tw-gradient-stops));
                    --tw-gradient-stops: var(--tw-gradient-from), ${backgroundStyle.background}, var(--tw-gradient-to, rgba(236, 72, 153, 0));
                    --tw-gradient-to: ${backgroundStyle.background};
                    --tw-gradient-from: ${backgroundStyle2.background};
                    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(167, 139, 250, 0));
                  }
                `}</style> : 
                <style jsx>{`
                  #color-picker-bt {
                    background: ${backgroundStyle.background};
                  }
                `}</style>}
            </Popover.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute z-40 max-w-sm px-4 mt-3 transform sm:-translate-x-1/2 left-0 sm:left-1/2 sm:px-0 lg:max-w-3xl"
            >
              <div className="py-1">
                <div className="flex bg-white border-2 border-gray-700 rounded-sm">
                  <button 
                    onClick={() => setSelected('color')}
                    className="p-1 flex-1 border-r-2 border-gray-700"
                  >
                    色
                  </button>
                  <button 
                    onClick={() => setSelected('image')}
                    className="py-1 px-2 flex-1"
                  >
                    画像
                  </button>
                </div>
                { selected === 'color' ? 
                  <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-700 rounded-sm">
                    <div className="flex border-b-2 border-gray-700">
                      <button 
                        onClick={() => callbackSetGradient(false)}
                        className="p-1 flex-1 border-r-2 border-gray-700"
                      >
                        単色
                      </button>
                      <button 
                        onClick={() => callbackSetGradient(true)}
                        className="py-1 px-2 flex-1"
                      >
                        グラデーション
                      </button>
                    </div>
                    <div>
                      { isGradient && <p className="ml-1 p-1">From</p>}
                      <TwitterPicker 
                        color={ backgroundStyle }
                        onChangeComplete={ _handleChangeComplete }
                        triangle="hide"
                      />
                    </div>
                    { isGradient && 
                    <div>
                      <p className="ml-1 p-1">To</p>
                      <TwitterPicker 
                        color={ backgroundStyle2 }
                        onChangeComplete={ _handleChangeComplete2 }
                        triangle="hide"
                      />
                    </div>}
                  </div>
                  : 
                  <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-700 rounded-sm">
                    <div className="p-1">
                      <input
                        type='file'
                        id='multi'
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => _handleUploadImageUrl(e)}
                      />
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => _handleResetImageUrl()}
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        リセット
                      </button>
                    </div>
                    <div className="p-1">
                      <img src={imageUrl} />
                    </div>
                  </div>
                }
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
