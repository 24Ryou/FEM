const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs')


// const imgSelector = '.preview-img'
const tagSelector = '#content ul:first li'
const hedlineSelector = '#content h1'
const textSelector = "#content p"


pathdir = 'challenges'

regex = /\(https:\/\/www.frontendmentor.io\/challenges.*\)/gm 
dirs = fs.readdirSync(pathdir)
files = dirs.map(x => `${pathdir}\\${x}\\README-template.md`)
jsonFilePaths = dirs.map(x => `${pathdir}\\${x}\\data.json`)
jsonFilePaths.map(x => fs.writeFileSync(x , ''))

urls = files.map(x => fs.readFileSync(x).toString().match(regex)[0].replace(/[()]/g, ''))
urls.forEach(async (url) => {
  
  axios.get(url).then(({ data }) => { 
    const $ = cheerio.load(data); // Initialize cheerio
    // imgUrl = $(imgSelector).attr('src')
    tags = []
    $(tagSelector).each((_ , e) => {
    tags.push($(e).text())
    })
    title = $(hedlineSelector).first().text()
    description = $(textSelector).first().text()
    folder = `challenges/${title.toLowerCase().replace(/\s/g, "-")}/`
    arr = {
      "folder": folder,
      "title": title,
      "orginalLink": url,
      "description": description,
      "tags":tags
    }
    json  = JSON.stringify(arr ,null , 2)
    fs.writeFile(folder+'data.json', json, 'utf8', (err) => {
      if (err) throw err
    });
    
  })
});