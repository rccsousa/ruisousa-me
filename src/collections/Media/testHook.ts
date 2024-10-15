import { CollectionAfterOperationHook, CollectionBeforeChangeHook, CollectionBeforeOperationHook } from 'payload'
import { Octokit } from '@octokit/rest'
import path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { generateFileData } from 'payload/dist/uploads/generateFileData'

import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'


export const testHook: CollectionBeforeChangeHook = async ({ data, req, operation, originalDoc }) => {
  console.log('this is the data:', data)
  console.log('originalDoc', originalDoc)
  console.log('req', req)
}

export const opHook: CollectionBeforeOperationHook = async ({
                                                              args, operation, req,
                                                            }) => {
  console.log('-----\n\nthe request: \n\n', args?.req?.file, '\n\n-----')
  let filePath = ''
  if (args?.req?.file?.name) {
    filePath = path.join('g:/', args.req.file.name)
  } else {
    filePath = path.join('g:/', 'unamed.png')
  }
  if (args?.req?.file?.data) {
    fs.writeFile(filePath, args.req.file.data, (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('ok')
      }
    })
  }

}


const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const owner = 'rccsousa'
const repo = 'ruisousa-me'
const branch = 'main'


export async function afterOp({ args, operation, req, result }): CollectionAfterOperationHook {
  if (req?.file) {
    console.log(req)
    // const fileName = req.file.name
    // const content = req.file.data
    //
    // try {
    //   // Push or update the file in the GitHub repository
    //   const response = await octokit.repos.createOrUpdateFileContents({
    //     owner,
    //     repo,
    //     path: `public/media/${fileName}`, // Path relative to the repository root
    //     message: `Pushed ${fileName} through CMS upload via Octokit`,
    //     content: Buffer.from(content).toString('base64'), // Encode content to base64
    //     branch,
    //   })
    // } catch (error) {
    //   return undefined
    // }
  } else {
    return undefined
  }
}



export async function uploadToGit({ args, operation, req, result }): CollectionAfterOperationHook {
  let fileName = ''
  let content = ''

  // Extract file name and content
  if (args?.req?.file?.name) {
    fileName = args.req.file.name
  }

  if (args?.req?.file?.data) {
    content = args.req.file.data
  }

  try {
    // Push or update the file in the GitHub repository
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: `public/media/${fileName}`, // Path relative to the repository root
      message: `Update file: ${fileName} via Octokit`,
      content: Buffer.from(content).toString('base64'), // Encode content to base64
      branch,
    })

    console.log('File pushed successfully:', response.data)
    return response.data // Return the response if needed for further processing
  } catch (error) {
    console.error('Error uploading file to GitHub:', error)
    throw error // Optionally throw the error or handle it as needed
  }
}
