import PageTemplate, { generateMetadata } from './[slug]/page'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export default async function Page() {

  const payload = await getPayloadHMR({ config: configPromise })

  const media = await payload.find({
    collection: 'media',
  }).then(res => res.docs[0].url)

  return (
    <div>
      <h5>Hello</h5>

      <img src={media}/>


      {<pre>{JSON.stringify(media, null, 2)}</pre>}
    </div>

  )
}
