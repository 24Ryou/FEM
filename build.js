const axios = require('axios'); 
const cheerio = require('cheerio'); 
const fs = require('fs')

// const imgSelector = '.preview-img'
const tagSelector = '#content ul:first li'
const hedlineSelector = '#content h1'
const textSelector = "#content p"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const pathdir = 'challenges'
const dirs = fs.readdirSync(pathdir)

const regex = /\(https:\/\/www.frontendmentor.io\/challenges.*\)/gm 
const files = dirs.map(x => `${pathdir}\\${x}\\README-template.md`)

const getLink = (folder) => {
  x = `challenges\\${folder}\\README-template.md`
  return fs.readFileSync(x).toString().match(regex)[0].replace(/[()]/g, '')
}

const invalidDir = (path) => {
  return !/\d/.test(path.split("_")[0])
}

const renameDirs = async () => {
  dirs.map( (ele , ndx) => {
    oldp = `challenges/${ele}`
    newp = `challenges/${(ndx+1).toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})}_${ele}`
    if(invalidDir(ele)) {
      fs.renameSync(oldp, newp, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully renamed the directory.")
        }
      })
    }
  })
}

const getData = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
   console.log(error) 
  }
}

const prepare = async () => {
  try {
    var jsonArr = []
    await renameDirs()
    const urls = dirs.map(x => getLink(x))
    await Promise.all(urls.map(async (url , ndx) => {
      const data = await getData(url)
      const $ = cheerio.load(data); // Initialize cheerio
      // imgUrl = $(imgSelector).attr('src')
      tags = []
      $(tagSelector).each((_ , e) => {
      tags.push($(e).text())
      })
      title = $(hedlineSelector).first().text()
      description = $(textSelector).first().text()
      // folder = `challenges/${title.toLowerCase().replace(/\s/g, "-")}/`
      arr = {
        "folder": dirs[ndx],
        "title": title,
        "orginalLink": url,
        "description": description,
        "tags":tags
      }
      jsonArr.push(arr)
    }))
    return jsonArr
  } catch (error) {
    console.log(error)
  }
}


const build = async () => {
  try {
    datas = await prepare()
    datas.sort((a , b) => a.folder.split("_")[0] - b.folder.split("_")[0])
    txt = "const projects = \n"
    fs.writeFileSync('projects.json' , txt)
    json  = JSON.stringify(datas ,null , 2)
    fs.appendFileSync('projects.json', json, 'utf8', (err) => {
      if (err) throw err
    });
  
    console.log('Successfull!')
  } catch (error) {
    console.log(error)
  }
}

build()