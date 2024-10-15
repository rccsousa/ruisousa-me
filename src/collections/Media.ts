import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


import * as fs from 'fs'
import file from '@apidevtools/json-schema-ref-parser/lib/resolvers/file'
import { afterOp, opHook, testHook, uploadToGit } from '@/collections/Media/testHook'
import { AfterChangeHook, BeforeChangeHook } from 'payload/dist/globals/config/types'
import { AfterOperationHook } from 'payload/dist/collections/config/types'



export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,

    // afterOperation: [afterOp],
    // afterOperation: [async ({ req }) : AfterOperationHook => {console.log(req)}]


  // hooks: {
  //   // beforeChange: [testHook],
  //   afterOperation: [uploadToGit],
  //
  //
  //
  // },



}
