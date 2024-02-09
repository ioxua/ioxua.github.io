import pug from 'pug'
import fs from 'fs/promises'
import { glob } from 'glob'

const pugFiles = await glob('src/*.pug', {
  ignore: 'src/_*.pug'
})

console.log('Pug files:', pugFiles)

for (const file of pugFiles) {
  const compiled = pug.compileFile(file)
  const dist = file
    .replace('src', 'dist')
    .replace('pug', 'html')

  const html = compiled()
  
  fs.writeFile(dist, html, { 
    encoding: 'utf-8',
  })
}
