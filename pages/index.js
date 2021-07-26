import { Fragment, useState, useEffect } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import domtoimage from 'dom-to-image'
import ColorPicker from '@/components/molecules/color-picker.js'
import Loading from '@/components/molecules/loading.js'
import CopyDropdown from '@/components/molecules/copy-dropdown-playground.js'
import { exportPNG } from '@/lib/export-png.js'
import { classNames } from '@/lib/style-utils.js'
import { ControlIcon, TwitterIcon } from '@/components/svg.js'
import { DEFAULT_META_TITLE, DEFAULT_META_DESCRIPTION } from '@/lib/constants.js'
import { LANGUAGES, THEMES } from '@/lib/playground/constants.js'

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key)

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue))
    }
  }, [key])

  useEffect

  return [value, setValue]
}

export default function Index () {
  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession()
  const [isLoading, setLoading] = useState(false)

  // Editor
  const [editorTheme, setEditorTheme] = useStickyState(THEMES[43], 'editorTheme') // material-ocean
  const [lang, setLang] = useStickyState(LANGUAGES[6], 'lang') // javaScript
  const [code, setCode] = useStickyState("console.log('Hello World!');", 'code')
  const [isGradient, setGradient] = useStickyState(true, 'isGradient')
  const [background, setBackground] = useStickyState({ background: '#FF6800' }, 'background')
  const [background2, setBackground2] = useStickyState({ background: '#9900EF' }, 'background2')
  const [imageUrl, setImageUrl] = useStickyState('', 'imageUrl')

  // Post Gist
  const [fileName, setFileName] = useStickyState('', 'fileName')

  const reset = () => {
    setEditorTheme(THEMES[43])
    setLang(LANGUAGES[6])
    setCode("console.log('Hello World!');")
    setBackground({ background: '#FF6800' })
    setBackground2({ background: '#9900EF' })
    setGradient(true)
    setFileName('')
    setImageUrl('')
  }

  const callbackFunction = (backgroundStyle) => {
    setBackground(backgroundStyle)
  }

  const callbackFunction2 = (backgroundStyle) => {
    setBackground2(backgroundStyle)
  }

  const callbackSetGradient = (isGradient) => {
    setGradient(isGradient)
  }

  const callSetImageUrl = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const tweet = () => {
    const node = document.getElementById('playground')
    domtoimage.toPng(node, { width: node.scrollWidth, height: node.scrollHeight })
      .then(async (encodedImage) => {
        const processedData = encodedImage.split(',')[1]
        const objectWithData = {
          image: processedData,
          text: 'Created with osushi'
        }
    
        const res = await fetch('/api/twitter/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objectWithData)
        })
    
        const data = await res.json()
        let shareURL = 'https://twitter.com/intent/tweet?'

        const params = {
          text: `Created with @osushicode ${data.url}`,
        }
      
        for(const prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop])
        window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
      })
  }

  const postGist = async () => {
    setLoading(true)

    const objectWithData = {
      accessToken: session.accessToken,
      fileName: fileName || 'from_osushi.md',
      content: code || "console.log('Hello World');",
      description: '',
      isPublic: false
    }

    await fetch('/api/github/gist/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objectWithData)
    })

    setLoading(false)
  }

  const options = {
    mode: lang.id,
    theme: editorTheme.id,
    tabSize: 2,
    screenReaderLabel: 'Code editor',
    lineNumbers: false,
    indentUnit: 2,
    firstLineNumber: 1,
    lineWrapping: true,
    undoDepth: 200,
    autofocus: false,
    dragDrop: true,
    spellcheck: false,
    autocorrect: false
  }

  return (
    <>
      <Head>
        <title>{ DEFAULT_META_TITLE }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={ DEFAULT_META_DESCRIPTION } />
        <meta property="og:title" content={ DEFAULT_META_TITLE } />
        <meta property="og:description" content={DEFAULT_META_DESCRIPTION} />
        <meta property="og:image" content="https://osushi.io/ogp.png" />
        <meta name="twitter:image" content="https://osushi.io/ogp.png"/>
        <meta name="twitter:card" content="summary"/>
      </Head>
      {isLoading && <Loading />}
      <div className="lg:mx-auto sm:mx-5 my-2 max-w-screen-xl">
        <main className="lg:col-span-9 xl:col-span-8">
          <div className="text-center my-8">
            <h2 className="text-xl md:text-4xl font-bold">Osushi 🍣</h2>
            <h2 className="text-base md:text-2xl font-medium">
                コードスニペットを作成し、美しい画像でシェアしましょう。
              <br/>
                入力を開始するか、テキスト領域にファイルをドロップしてください。
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 sm:p-10 shadow rounded-sm border-4 border-gray-600 dark:border-white">
            <div className="sm:flex items-center justify-between flex-wrap">
              <div className="sm:flex">
                <div className="mb-2 sm:mb-0 sm:mr-4">
                  <Listbox className="cursor-pointer" value={lang} onChange={setLang}>
                    {({ open }) => (
                      <>
                        <div className="relative min-w-full w-40">
                          <Listbox.Button className="bg-white dark:text-gray-800 relative w-full border-2 border-gray-800 rounded-sm p-2 md:pl-3 md:pr-10 md:py-2 text-left focus:outline-none text-xs sm:text-sm">
                            <span className="block truncate">{lang.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 w-full border-2 border-gray-800 bg-white dark:text-gray-200 max-h-60 rounded-sm py-1 text-sm: sm:text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-xs sm:text-sm"
                            >
                              {LANGUAGES.map((lang) => (
                                <Listbox.Option
                                  key={lang.id}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                      'cursor-pointer select-none relative py-2 pl-3 pr-9'
                                    )
                                  }
                                  value={lang}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                        {lang.name}
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                          )}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
                <div className="mb-2 sm:mb-0">
                  <Listbox className="cursor-pointer" value={editorTheme} onChange={setEditorTheme}>
                    {({ open }) => (
                      <>
                        <div className="relative min-w-full w-40">
                          <Listbox.Button className="bg-white dark:text-gray-800 relative w-full border-2 border-gray-800 rounded-sm p-2 md:pl-3 md:pr-10 md:py-2 text-left focus:outline-none text-xs sm:text-sm">
                            <span className="block truncate">{editorTheme.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 border-2 border-gray-800 w-full bg-white dark:text-gray-200 max-h-60 rounded-sm py-1 text-sm: sm:text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-xs sm:text-sm"
                            >
                              {THEMES.map((item) => (
                                <Listbox.Option
                                  key={item.id}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                      'cursor-pointer select-none relative py-2 pl-3 pr-9'
                                    )
                                  }
                                  value={item}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                        {item.name}
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                          )}
                                        >
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
              <div className="sm:ml-4 flex flex-wrap">
                <div className="mr-2">
                  <CopyDropdown code={code} />
                </div>
                <div className="mr-2">
                  <ColorPicker 
                    isGradient={ isGradient }
                    backgroundStyle={ background }
                    backgroundStyle2={ background2 }
                    parentCallback={ callbackFunction }
                    parentCallback2={ callbackFunction2 }
                    callbackSetGradient={ callbackSetGradient }
                    imageUrl={ imageUrl }
                    callSetImageUrl={ callSetImageUrl }
                  />
                </div>
                <div className="mr-2">
                  <button
                    type="button"
                    className="block p-2 sm:px-4 sm:py-2 border border-transparent dark:border-green-300 text-xs sm:text-sm font-medium rounded-sm shadow-sm text-white dark:text-green-300 bg-indigo-600 dark:bg-gray-800 hover:bg-indigo-700 dark:hover:bg-gray-600 focus:outline-none"
                    onClick={() => exportPNG('playground')}
                  >
                      PNG出力
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => tweet()}
                    type="button"
                    className="inline-flex items-center p-2 sm:px-4 sm:py-2 text-blue-500 dark:text-blue-300 text-xs sm:text-sm font-medium bg-blue-100 dark:bg-gray-900 border border-blue-100 dark:border-blue-300 rounded-sm"
                  >
                    <TwitterIcon />
                    ツイート
                  </button>
                </div>
              </div>
            </div>
            <div id="export-container" className="my-10">
              <div 
                id="playground"
                className="p-8 md:p-16"
              >
                { imageUrl ? <style jsx>{`
                  #playground {
                    background-image: url(${imageUrl});
                    background-size:cover;
                    background-repeat: no-repeat;
                  }
                `}</style> : 
                  <>
                    { isGradient ? <style jsx>{`
                      #playground {
                        background-image: linear-gradient(to right, var(--tw-gradient-stops));
                        --tw-gradient-stops: var(--tw-gradient-from), ${background.background}, var(--tw-gradient-to, rgba(236, 72, 153, 0));
                        --tw-gradient-to: ${background.background};
                        --tw-gradient-from: ${background2.background};
                        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(167, 139, 250, 0));
                      }
                    `}</style> : 
                      <style jsx>{`
                      #playground {
                        background: ${background.background};
                      }
                    `}</style>}
                  </>
                }
                <div className="window-controls">
                  <ControlIcon />
                  <div className="window-title-container">
                    <input 
                      aria-label="Image Title"
                      type="text"
                      spellCheck="false"
                      value={fileName}
                      onChange={e => setFileName(e.target.value)}
                    />
                  </div>
                </div>
                <CodeMirror
                  autoCursor={true}
                  autoScroll={true}
                  className="sm:text-lg text-mobile-input font-medium shadow-2xl"
                  options={options}
                  value={code}
                  onBeforeChange={(editor, data, value) => {
                    setCode(value)
                  }}
                />
              </div>
            </div>
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap">
              <div />
              <div className="ml-4 flex flex-wrap">
                <div className="mr-4">
                  {session && <button
                    type="button"
                    className="p-2 sm:px-4 sm:py-2 border border-transparent dark:border-green-300 text-xs sm:text-sm font-medium rounded-sm shadow-sm text-white dark:text-green-300 bg-indigo-600 dark:bg-gray-800 hover:bg-indigo-700 dark:hover:bg-gray-600 focus:outline-none"
                    onClick={() => postGist()}
                  >
                    Gist 投稿
                  </button>}
                </div>
                <div>
                  <button
                    type="button"
                    className="p-2 sm:px-4 sm:py-2 border border-transparent dark:border-green-300 text-xs sm:text-sm font-medium rounded-sm shadow-sm text-white dark:text-green-300 bg-indigo-600 dark:bg-gray-800 hover:bg-indigo-700 dark:hover:bg-gray-600 focus:outline-none"
                    onClick={() => reset()}
                  >
                    リセット
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
