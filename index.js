var request = require('request');
var cheerio = require('cheerio');
var color = require('cli-color');
var language = 'en'

exports.lang = function(l){
    language = l;

}
exports.wiki = function(word,lang){
    request({url:'http://'+language+'.wikipedia.org/wiki/'+word,encoding:'utf8'},function (err,response,body) {
        console.log(color.green('http://'+language+'.wikipedia.org/wiki/'+word));
        if(err) throw err;
        var $ = cheerio.load(body);
         
        
        if($('table.infobox').length){
            var i = $('table.infobox').next();
            for(;!i.hasClass('toc');i = i.next()){
                console.log(color.blue(i.text().replace("\n","")));
            }
        }else{
            console.log(color.red('No wiki about ')+word);
        }
        
        
    });

}

