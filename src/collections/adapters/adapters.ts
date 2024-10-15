import { GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const owner = 'rccsousa'
const repo = 'ruisousa-me'
const comitter = {
  name: 'payload',
  email: 'payload@example.com',
}


export const testAdapt = ({ collection, prefix }): GeneratedAdapter => {
  console.log("\n --- PASSED THROUGH testAdapt --- \n");
  return {
    name: "Test",
    handleUpload: async (args) => {
      console.log(`
      --- UPLOADING ${args.file.filename} TO GITHUB ---`)
      const buffer = Buffer.from(args.file.buffer, 'base64')
      const base64Buffer = buffer.toString('base64')
      await octokit.repos.createOrUpdateFileContents({
        owner: owner,
        repo: repo,
        path: `public/media/${args.file.filename}`,
        message: 'Uploaded a new file via Octokit',
        content: base64Buffer,
        committer: comitter,
        author: comitter,
      })



    },
    handleDelete: async (args) => {
      console.log(`
      ---- DELETING ${args.filename} ----
      `)

      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: owner,
        repo: repo,
        path: `public/media/${args.filename}`
      })

      console.log(`
      --- THE SHA IS ${fileData.sha} ---
      --- DELETING THE FILE ---
      `)

      await octokit.rest.repos.deleteFile({
        owner: owner,
        repo: repo,
        path: `public/media/${args.filename}`,
        message: `Deleted file via Octokit`,
        sha: fileData.sha,
      })

      console.log('\n --- WHOOSH: GONE --- \n')

    },
    staticHandler: (req) => {
      console.log(`
 -- Static Handler says hi --
 Logging the req:`);

    },

  };

};
