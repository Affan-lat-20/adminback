const request = require('request-promise');
const cheerio = require('cheerio');
const axios = require('axios');
const { response } = require('express');
const req = require('request');

// const fs = require('fs');
// const json2csv = require("json2csv").Parser;
//88888888888888888888////////
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}


async function getInstagramFollowers(html) {
  // load up Cheerio
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

async function getInstagramCount() {
  const html = await getHTML('https://instagram.com/dananeerr');
  const instagramCount = await getInstagramFollowers(html);
  return instagramCount;
}

exports.instagramfollowers = async(req,res,next)=>{

	// var conditions =req.params.username;
	// console.log(`Scraping!!`);
  const [iCount] = await Promise.all([
    getInstagramCount()    
  ]);
  
  res.json({ iCount });
}

///////8888888888888888///////////

// async function getData(conditions) {
// 	return new Promise(async (resolve, reject)=> {
// 		var movie = `https://www.instagram.com/${conditions}/?hl=en`;
		
// 		const response = await request({
// 			uri:movie,
// 			headers:{
// 				"accept": "*/*",
// 				"accept-encoding": "gzip, deflate, br",
// 				"accept-language": "en-US,en;q=0.9"
// 			},
// 			gzip:true,
// 		});

// 		let $ = await cheerio.load(response)
// 		let dataInString = $('script[type="application/ld+json"]').html();
		
// 		const object = await JSON.parse(dataInString);
// 		console.log('~~~object~~~: ',object);

// 		if(object == null || object == undefined){
// 			return reject(false)
// 		}
// 		else {
// 			console.log('else: ', object);
// 			return resolve(object);
// 		}
// 	})
// }

// function getDatahelper(conditions) {
// 	return new Promise((resolve)=> {
// 		getData(conditions).then(
// 			response=> {
// 				resolve(response)
// 			},
// 			err=> {
// 				console.log('err:', err);
// 				getDatahelper(conditions)
// 			}
// 		)
// 	})
// }

// exports.instagramfollower = async(req,res,next)=>{

// 	var conditions =req.params.username;
// 	// getDatahelper(conditions).then(
// 	// 	(data)=> {
// 	// 		console.log('data:', data);
// 	// 		res.send(data);
// 	// 	},
// 	// 	(error)=> {
// 	// 		console.log(error)
// 	// 		res.send({error: 'Main module error'})
// 	// 	}
// 	// );
// 	const getData = await getDatahelper(conditions);
// 	res.send(getData);
// }

