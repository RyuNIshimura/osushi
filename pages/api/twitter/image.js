const Twit = require('twit')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }

  // eslint-disable-next-line no-unused-vars
  const { image, text } = req.body

  const T = new Twit({
    consumer_key:         process.env.TWITTER_API_KEY,
    consumer_secret:      process.env.TWITTER_API_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            false,    // optional - requires SSL certificates to be valid.
  })

  // eslint-disable-next-line no-unused-vars
  await T.post('media/upload', { media: image }, async (err, data, response) => {
    const mediaIdStr = data.media_id_string
    const altText = 'Small flowers in a planter on a sunny balcony, blossoming.'
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    // eslint-disable-next-line no-unused-vars
    T.post('media/metadata/create', meta_params, async (err, data, response) => {
      if (!err) {
        const params = { status: '', media_ids: [mediaIdStr] }
  
        // eslint-disable-next-line no-unused-vars
        T.post('statuses/update', params, (err, data, response) => {
          console.log(data.entities.media[0].display_url)
          res.status(200).json({ 'url': data.entities.media[0].display_url })
        })
      }
    })
  })
}