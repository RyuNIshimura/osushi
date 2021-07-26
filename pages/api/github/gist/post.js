import { Octokit } from 'octokit'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }

  const { accessToken, fileName, content, description, isPublic } = req.body
  const octokit = new Octokit({ auth: accessToken })

  // https://docs.github.com/en/rest/reference/gists#create-a-gist
  const response = await octokit.request('POST /gists', {
    files: {
      [fileName]: {
        content: content
      }
    },
    description: description,
    public: isPublic
  })

  res.status(200).json(response.data)
}