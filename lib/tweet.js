export function tweetSite() {
  const osushiLink = 'https://osushi.io/'

  let shareURL = 'http://twitter.com/share?'

  const params = {
    url: osushiLink,
  }

  for(const prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop])
  window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
}