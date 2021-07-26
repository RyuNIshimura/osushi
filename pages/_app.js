import '@/styles/globals.scss'
import '@/styles/tailwind-utils.css'
import '@/styles/tailwind.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

import 'codemirror/theme/3024-day.css'
import 'codemirror/theme/3024-night.css'
import 'codemirror/theme/abbott.css'
import 'codemirror/theme/abcdef.css'
import 'codemirror/theme/ambiance-mobile.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/ayu-dark.css'
import 'codemirror/theme/ayu-mirage.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/bespin.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/colorforth.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/duotone-dark.css'
import 'codemirror/theme/duotone-light.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/elegant.css'
import 'codemirror/theme/erlang-dark.css'
import 'codemirror/theme/gruvbox-dark.css'
import 'codemirror/theme/hopscotch.css'
import 'codemirror/theme/icecoder.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/isotope.css'
import 'codemirror/theme/lesser-dark.css'
import 'codemirror/theme/liquibyte.css'
import 'codemirror/theme/lucario.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/theme/material-palenight.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/mbo.css'
import 'codemirror/theme/mdn-like.css'
import 'codemirror/theme/midnight.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/moxer.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/neo.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/nord.css'
import 'codemirror/theme/oceanic-next.css'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/theme/paraiso-dark.css'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/theme/pastel-on-dark.css'
import 'codemirror/theme/railscasts.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/theme/seti.css'
import 'codemirror/theme/shadowfox.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/ssms.css'
import 'codemirror/theme/the-matrix.css'
import 'codemirror/theme/tomorrow-night-bright.css'
import 'codemirror/theme/tomorrow-night-eighties.css'
import 'codemirror/theme/ttcn.css'
import 'codemirror/theme/twilight.css'
import 'codemirror/theme/vibrant-ink.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/theme/xq-light.css'
import 'codemirror/theme/yeti.css'
import 'codemirror/theme/yonce.css'
import 'codemirror/theme/zenburn.css'

import Router  from 'next/router'
import { Provider } from 'next-auth/client'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/organisms/layout.js'
import * as gtag from '@/lib/gtag'

if (process.env.NODE_ENV === 'production') {
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))
}

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/css/css')
  require('codemirror/mode/dart/dart')
  require('codemirror/mode/dockerfile/dockerfile')
  require('codemirror/mode/go/go')
  require('codemirror/mode/haml/haml')
  require('codemirror/mode/haskell/haskell')
  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/jsx/jsx')
  require('codemirror/mode/julia/julia')
  require('codemirror/mode/lua/lua')
  require('codemirror/mode/markdown/markdown')
  require('codemirror/mode/nginx/nginx')
  require('codemirror/mode/perl/perl')
  require('codemirror/mode/php/php')
  require('codemirror/mode/powershell/powershell')
  require('codemirror/mode/pug/pug')
  require('codemirror/mode/python/python')
  require('codemirror/mode/ruby/ruby')
  require('codemirror/mode/rust/rust')
  require('codemirror/mode/sass/sass')
  require('codemirror/mode/shell/shell')
  require('codemirror/mode/sql/sql')
  require('codemirror/mode/stylus/stylus')
  require('codemirror/mode/swift/swift')
  require('codemirror/mode/toml/toml')
  require('codemirror/mode/vue/vue')
  require('codemirror/mode/xml/xml')
  require('codemirror/mode/yaml/yaml')
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
