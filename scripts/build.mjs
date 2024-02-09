import pug from 'pug'
import fs from 'fs/promises'
import { dirname } from 'path'
import { glob } from 'glob'

const pugFiles = await glob('src/**/*.pug', {
  ignore: 'src/_*.pug'
})

console.log('Pug files:', pugFiles)

for (const file of pugFiles) {
  const compiled = pug.compileFile(file)

  // Convert filename (src/index.pug) to dist (dist/index.html)
  const dist = file
    .replace('src', 'dist')
    .replace('pug', 'html')

  const html = compiled()

  // Get dirname (dist) from filename (dist/index.html)
  const dir = dirname(dist)

  // Create dist dir if it doesn't exist
  await fs.mkdir(dir, { recursive: true })
  
  // Write html file
  await fs.writeFile(dist, html, { 
    encoding: 'utf-8',
  })
}
