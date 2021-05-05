const request = require('request-promise');
const cheerio = require('cheerio');
const { default: getMetaData } = require('metadata-scraper');
// const fs = require('fs');
// const json2csv = require("json2csv").Parser;

var retries = 0;

async function getData(conditions ) {
	try {
		var movie = `https://www.instagram.com/${conditions}/?hl=en`;
		
		const response =await request({
			uri:movie,
			headers:{
				"accept": "*/*",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "en-US,en;q=0.9"
			},
			gzip:true,
		});

		let $ = await cheerio.load(response)
		let dataInString = $('script[type="application/ld+json"]').html();
		
		const object = await JSON.parse(dataInString);
		console.log('~~~object~~~: ',object);

		if(!object)
		{
			retries++;
			if ( retries > 3 )
			{
				console.log("Continously receiving null as response...\n");
				retries = 0;
				return {"err": "500", "message": "general processing error"};
			}
			console.log(`Retries remaining: ${retries}\n`);
			getData(conditions);
		}

		else {
			console.log('else: ', object);
			return object;
		}
	}
	catch(ex) {
		console.log("Exception occured: " + ex.message);
	}
}

exports.instagramfollow = async(req,res,next)=>{

	var conditions =req.params.username;

	if (conditions!=null) {
		
		const data = await getData(conditions);
		console.log('data:', data);
		res.send(data);
	}
	else 
		console.log('else empty');
		res.send({error:'Username is empty'});
}

