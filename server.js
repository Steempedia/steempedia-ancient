
const path = require('path')
var express = require('express');
var app = express();
var sm = require('sitemap');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


 
var sitemap = sm.createSitemap ({
  hostname: 'https://www.steempedia.com',
  cacheTime: 600000,        // 600 sec - cache purge period 
    urls: [
     { url: '/',  changefreq: 'daily', priority: 0.3 },
     { url: '/market',  changefreq: 'weekly', priority: 0.5 },
     { url: '/news',  changefreq: 'weekly', priority: 0.5 },
     { url: '/apps',  changefreq: 'weekly', priority: 0.5 },
     { url: '/insights',  changefreq: 'weekly', priority: 0.5 },
     { url: '/discover',  changefreq: 'weekly', priority: 0.5 },
     { url: '/explore',  changefreq: 'weekly', priority: 0.5 },
     { url: '/terms-and-privacy',  changefreq: 'weekly', priority: 0.5 },
     { url: '/about',  changefreq: 'weekly', priority: 0.5 }
    ]
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/publish', function (req, res) {
  res.sendFile(path.join(__dirname + '/publish.html'))
})

app.get('/user', function (req, res) {
  res.sendFile(path.join(__dirname + '/user.html'))
})

app.get('/tags/:tag', function (req, res) {
  res.sendFile(path.join(__dirname + '/tag.html'))
})

app.get('/market', function (req, res) {
  res.sendFile(path.join(__dirname + '/market.html'))
})

app.get('/news', function (req, res) {
  res.sendFile(path.join(__dirname + '/news.html'))
})

app.get('/insights', function (req, res) {
  res.sendFile(path.join(__dirname + '/insights.html'))
})

app.get('/apps', function (req, res) {
  res.sendFile(path.join(__dirname + '/apps.html'))
})

app.get('/discover', function (req, res) {
  res.sendFile(path.join(__dirname + '/discover.html'))
})

app.get('/explore', function (req, res) {
  res.sendFile(path.join(__dirname + '/explore.html'))
})

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/about.html'))
})

app.get('/terms-and-privacy', function (req, res) {
  res.sendFile(path.join(__dirname + '/terms-and-privacy.html'))
})

app.get('/me', function (req, res) {
  res.sendFile(path.join(__dirname + '/me.html'))
})

app.get('/@:username', function (req, res) {
  res.sendFile(path.join(__dirname + '/user.html'))
})

app.get('/@:username/:permLink', function (req, res) {
  res.sendFile(path.join(__dirname + '/article.html'))
})

app.get('/:category/@:username/:permLink', function (req, res) {	
	var user = req.params.username;
	var permLink = req.params.permLink;
	res.redirect("/@" + user + "/" + permLink);
})


app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});



app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname + '/404.html'))
})

 
 var port = process.env.PORT || 80;
  app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

