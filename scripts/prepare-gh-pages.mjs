import fs from 'node:fs'
import path from 'node:path'

const outDir = path.resolve('out')

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true })
}
fs.mkdirSync(outDir, { recursive: true })

fs.writeFileSync(path.join(outDir, '.nojekyll'), '')

if (fs.existsSync('.next/static')) {
  fs.cpSync('.next/static', path.join(outDir, '_next/static'), { recursive: true })
  console.log('Copied .next/static → out/_next/static')
}

if (fs.existsSync('public/styles')) {
  fs.cpSync('public/styles', path.join(outDir, 'styles'), { recursive: true })
  console.log('Copied public/styles → out/styles')
}

fs.writeFileSync(
  path.join(outDir, 'index.html'),
  `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8"><title>Admin Marketing Remote</title></head>
<body><p>admin-marketing Module Federation Remote</p></body>
</html>`,
)

console.log('GH Pages artifact ready at ./out')
