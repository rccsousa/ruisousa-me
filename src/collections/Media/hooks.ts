import { Octokit } from '@octokit/rest'
import * as fs from 'fs'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

async function uploadToGit(filePath, base64Content) {
  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: 'rccsousa',
      repo: 'rsousa-me'
      path: filePath,
      message: 'Upload a new file',
      content: base64Content,
      committer: {
        name: 'Payload Admin',
        email: 'contact@ruisousa.me'
      },
      author: {
        name: 'Payload Author',
        email: 'contact@ruisousa.me',
      }
    })
  } catch (err) {
    console.error(err)
  }
}
