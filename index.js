//declare variable app for the api, I'm building
//it's value is import express
//added parenthesis so I can initialize it
//at this point, api hasn't been defined an endpoint
//fire api on the server, is by calling app.listen, which tells it to listen on a specific port which is 8080
//and as optional second argument to listen, fire a callback to let us know when the api is ready
//console log the main url
//run this using node .
//if we paste the url into the browser, as you can see we get the message of cannot get
//that's because we didn't have any endpoints set up yet buy express is still responding with an error message
//if you open up the network tap, you will see that the server responded with 404 status code, meaning that the page is not found
//we know that the api is working, but debugging it in the browser is not the best option
//there are so many ways to access the api
//1- use curl from the command line -> curl http://localhost:8080
//2- download vs code extension
//3- we can use rest client like postman or insomnia
//let's add an endpoint, by adding an http verb to the app instance
//if you typed app. you will get intellisense on different methods to use on this object
//if you want to create an endpoint, then we have to create a route to the resources we have
//passing tshirt as first argument, that wil automatically set up our server with that endpoint
//then it's our job to handle a request to it, which we do by passing a callback function as a second argument named handler
//when a client or a user request that url, it will fire this callback function to handle this request 
//the function itself provides access to two different objects, the request object and the response object
//req = incoming data, while res it outgoing data back to the client
//this allows us to send a response with a status code to the client like 200
//then we can send a data payload with it, if we pass a javascript object as the argument, then it will send the data back as a json by default
//if we make a get request to the url with route thsirt -> get http://localhost:8080/tshirt
//then we will get back a json object with tshirt and size in the response body with status code of 200
//let's create a 2nd endpoint with a dynamic url parameter
//that dynamic url allows us to handle all of them from a single function
//when dealing with post request means that the client is trying to create a new data on the server
//we need the id that we can get from the url and the value is made available to us on the request parameters object
//express doesn't parse json in the body by default
//we need here to set up a middleware, that tells express to prase json before the actual data hits the function we are  using to handle the request 
//middleware, shared code that runs before every endpoint callback
//very common middleware, is built into express itself
//we will refactor our code to make a variable express, apply app.use to use middleware
//every request will go first this express json middleware which will convert the body to json and therefore making it available in our post callback
//if we sent a post request with an empty string, we will get a 419 response with message that we meed a logo
//and this is restful api 101
//we have to know open api spec, which provides a standard way to describe the api in yam, it originally cam in swagger framework, describe api in readable form for humans and machine
//free tool called swagger hub
//when you use api spec config, you can upload config to api gateway on aws or google cloud where can be secured and connected to backend infrastructure
const express = require('express')();
const app = express();
const Port = 8080;
//middleware
app.use(express.json())

// app.listen(
//     Port,
//     () => console.log(`it's alive on http://localhost:8080`)
// );

// 1st endpoint
// GET https://localhost:8080/tshirt
//tshirt is route
// app.get('/tshirt', (req, res) => {
//     res.status(200).send({
//         tshirt: 'red',
//         size: 'large'
//     });
// });

//2nd endpoint
//:id -> route params -> captures dynamic values in the url
app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: 'we need a logo' })
    }

    res.send({
        tshirt: `with you ${logo} and if of ${id}`,
    })
});