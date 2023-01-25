const fs = require('fs')

pathdir = 'challenges'
dirs = fs.readdirSync(pathdir)

txt = "const projects = \n"
files = dirs.map(x => `${pathdir}\\${x}\\data.json`)
datas = files.map(x => JSON.parse(fs.readFileSync(x)))
fs.writeFileSync('projects.json' , txt)
json  = JSON.stringify(datas ,null , 2)
fs.appendFileSync('projects.json', json, 'utf8', (err) => {
  if (err) throw err
});

console.log('successfull')


