let VideoStream =require('../node-rtsp-stream-es6')
const express = require('express')
const router = express.Router()
const passport = require('passport')

const WebSocket = require('ws');

var option = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
		"Access-Control-Allow-Headers": "Content-Type"
	},
	port: 9999
};
  const wsServer = new WebSocket.Server(option)

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
        
        

        const { url } = req.body

        console.log('url: ', url)

         const options = {
            name: 'streamName',
            url: url,
            port: 9999
          }
      
          
          videoStream = new VideoStream(wsServer, options)
          videoStream.start()
          
         /*  try{
            stream = new Stream(options)
            stream.start()
          } catch {
            return new Error("Can't open another stream")
          }  */
          

         /* stream = new Stream({
            name: 'name',
            streamUrl: url,
            wsPort: 9999,
            ffmpegOptions: { // options ffmpeg flags
              '-stats': '', // an option with no neccessary value uses a blank string
              '-force_fps': 30 // options with required values specify the value after the key
            }
          }); */
 

        res.status(200).send("success");


    }
)



module.exports = router;