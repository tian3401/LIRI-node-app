require("dotenv").config();
var request= require("request");
var keys= require("./keys");
var fs= require("fs");


// var client= new Twitter(keys.twitter);

// //Section of code that deals with Spotify api 
var Spotify= require('node-spotify-api');
 
var spotify= new Spotify(keys.spotify);

if(process.argv[2]==="spotify-this-song"){
  var songName = process.argv[3];
  spotify
  .search({ type: 'track', query: songName })
  .then(function(response) {
    console.log("Track Name:"+JSON.stringify(response.tracks.items[0].album.name));
    console.log("Artist:"+JSON.stringify(response.tracks.items[0].artists[0].name));
    console.log("Song URL:"+JSON.stringify(response.tracks.items[0].artists[0].external_urls.spotify));
    console.log("Album:"+JSON.stringify(response.tracks.items[0].album.album_type));
 
  })
  .catch(function(err) {
    console.log(err);
  });
}

  //Section of code that controls the omdb api
if(process.argv[2]==="movie-this"){
  if(process.argv[3]==undefined){
    console.log("If you haven't watched Mr. Nobody, then you should. Here's the link http://www.imdb.com/title/tt0485947/. It's on Netflix!");
  }
  else{
  var movieName= process.argv[3];
  console.log(movieName);
  request("http://www.omdbapi.com/?apikey=5923b281&t="+movieName+"&y=1993", function(error, response, body) {
  console.log("Body:", body);
  console.log("Title:"+ body.Title);
  });
  }
}

//Section of code of do what it says command 
if(process.argv[2]==="do-what-it-says"){

  fs.readFile("random.txt","utf8", function(error, data){
    if (error){
      return console.log(error);
    }

  var dataArr= data.split(",")
  process.argv[2]= dataArr[0];
  var songName= dataArr[1];

    if(process.argv[2]==="spotify-this-song"){
      spotify
      .search({ type: 'track', query: songName })
      .then(function(response) {
        console.log("Track Name:"+JSON.stringify(response.tracks.items[0].album.name));
        console.log("Artist:"+JSON.stringify(response.tracks.items[0].artists[0].name));
        console.log("Song URL:"+JSON.stringify(response.tracks.items[0].artists[0].external_urls.spotify));
        console.log("Album:"+JSON.stringify(response.tracks.items[0].album.album_type));
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  })
};