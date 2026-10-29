import {getCliClient} from 'sanity/cli'
import fs from 'fs'
import path from 'path'

const client = getCliClient({apiVersion: '2023-05-03'})

// Read BASE_ARTICLES from generate-blogs.js
const generateBlogsPath = path.resolve(process.cwd(), '../generate-blogs.js')
const fileContent = fs.readFileSync(generateBlogsPath, 'utf8')

// Extract the BASE_ARTICLES array using evaluation
const match = fileContent.match(/const BASE_ARTICLES = (\[[\s\S]*?\n\]);/)
if (!match) {
  console.error('Could not find BASE_ARTICLES in generate-blogs.js')
  process.exit(1)
}

const BASE_ARTICLES = eval(match[1])
console.log(`Found ${BASE_ARTICLES.length} base articles to import into Sanity...`)

function htmlToBlocks(html) {
  const blocks = []
  // Split into lines/tags
  const cleanHtml = html.replace(/\r/g, '').trim()
  const regex = /<(h2|h3|p|li|blockquote)>([\s\S]*?)<\/\1>/gi
  let m
  let keyIndex = 1

  while ((m = regex.exec(cleanHtml)) !== null) {
    const tag = m[1].toLowerCase()
    let innerText = m[2].replace(/<[^>]+>/g, '').trim()
    if (!innerText) continue

    const blockKey = `b_${Date.now()}_${keyIndex++}`
    const spanKey = `s_${Date.now()}_${keyIndex++}`

    if (tag === 'li') {
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: 'normal',
        listItem: 'bullet',
        markDefs: [],
        children: [{ _type: 'span', _key: spanKey, text: innerText, marks: [] }]
      })
    } else if (tag === 'h2' || tag === 'h3') {
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: tag,
        markDefs: [],
        children: [{ _type: 'span', _key: spanKey, text: innerText, marks: [] }]
      })
    } else if (tag === 'blockquote') {
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: 'blockquote',
        markDefs: [],
        children: [{ _type: 'span', _key: spanKey, text: innerText, marks: [] }]
      })
    } else {
      blocks.push({
        _type: 'block',
        _key: blockKey,
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: spanKey, text: innerText, marks: [] }]
      })
    }
  }

  return blocks
}

async function runImport() {
  try {
    // 1. Create or ensure Authors
    console.log('Ensuring authors exist in Sanity...')
    const author1 = await client.createIfNotExists({
      _id: 'author-amit-kapoor',
      _type: 'author',
      name: 'Amit Kapoor',
      role: 'Master Stylist & Patch Specialist • Delhi NCR',
      bio: 'Over 12 years of clinical hair system styling, personalized custom cutting, and undetectable hairline reconstruction.'
    })

    const author2 = await client.createIfNotExists({
      _id: 'author-meera-sharma',
      _type: 'author',
      name: 'Dr. Meera Sharma',
      role: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
      bio: 'Trichology consultant specializing in non-surgical hair replacement protocols, scalp health, and hair restoration care.'
    })

    // 2. Create or ensure Categories
    console.log('Ensuring categories exist in Sanity...')
    const categoriesMap = {}
    const distinctCategories = [...new Set(BASE_ARTICLES.map(a => a.category))]

    for (const catName of distinctCategories) {
      const catSlug = catName.toLowerCase().replace(/[^a-z0-9]/g, '-')
      const doc = await client.createIfNotExists({
        _id: `category-${catSlug}`,
        _type: 'category',
        title: catName,
        description: `Expert articles covering ${catName.toLowerCase()} by Doctor Comb.`
      })
      categoriesMap[catName] = doc._id
    }

    // 3. Upload & link Local Images where possible
    const assetsDir = path.resolve(process.cwd(), '../')

    // 4. Create all 12 Posts
    console.log('Importing base articles into Sanity...')
    for (const article of BASE_ARTICLES) {
      const postDocId = `post-${article.slug}`
      const authorRefId = (article.author && article.author.includes('Meera')) ? author2._id : author1._id
      const catRefId = categoriesMap[article.category]

      // Check if image exists locally to upload to Sanity asset pipeline
      let imageAssetRef = null
      if (article.img && !article.img.startsWith('http')) {
        const fullImgPath = path.join(assetsDir, article.img)
        if (fs.existsSync(fullImgPath)) {
          try {
            const asset = await client.assets.upload('image', fs.createReadStream(fullImgPath), {
              filename: path.basename(fullImgPath)
            })
            imageAssetRef = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id
              }
            }
          } catch (imgErr) {
            console.warn(`Could not upload image for ${article.slug}:`, imgErr.message)
          }
        }
      }

      const postDoc = {
        _id: postDocId,
        _type: 'post',
        title: article.title,
        slug: {
          _type: 'slug',
          current: article.slug
        },
        publishedAt: new Date().toISOString(),
        excerpt: article.excerpt,
        takeaway: article.takeaway,
        author: {
          _type: 'reference',
          _ref: authorRefId
        },
        categories: catRefId ? [{
          _type: 'reference',
          _key: `cat_${Date.now()}`,
          _ref: catRefId
        }] : [],
        body: htmlToBlocks(article.content)
      }

      if (imageAssetRef) {
        postDoc.mainImage = imageAssetRef
      }

      const created = await client.createOrReplace(postDoc)
      console.log(`✓ Imported post into Sanity: "${created.title}" (slug: ${article.slug})`)
    }

    console.log('\n🎉 ALL 12 BASE ARTICLES SUCCESSFULLY IMPORTED INTO SANITY!')
    console.log('You can now see, edit, or delete all of them inside https://doctorcomb.sanity.studio/ !')
  } catch (err) {
    console.error('Error during Sanity import:', err)
  }
}

runImport()
