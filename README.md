# crowdServer
p2p application hosting. Hopefully written in node.
  
###Goals:  
Function  
Client A can obtain local bundle and upload to S  
Client B can download bundle from S and deploy  
Server S can hold a list of possible clients, and can check on or off state  
Server S can send a signal to Client B to download and deploy bundle from A  

Redundancy  
Server S asks multiple Clients to download and deploy, keeping track of Client pool running a bundle  
Server synchronizes Client pool by signals, telling an old Client to update itself with new Client database  

Convenience: Frameworks can call deploy to Server S, which then automagically makes the app p2p  
Security: lolk

##What Actually Happened:  
The portion that runs on your computer (the peer) is clientApp/server.js. This houses an upload form in which a developer may upload his Node.js application in tarball form (.tar.gz). The file is uploaded to centralServer/server.js, which functions like the central control unit of the network of peers.  

Once uploaded, the server notes the application's identifying features into its MongoDB database, and searches for suitable peers to delegate the application to.  

These peers should already have connected to the server, estabilishing a connection via socket.io. The server keeps track of the status of all peers.  

Once a peer is found to be deployed to, the server sends it a command including the app name and index file of the app to deploy. The peer responds with a GET request, authenticating via app name and its unique socket id. The bundled app is sent over via a file stream, and upon completion is extracted and deployed on a child process.  

##Things it should be able to do, but can't  
 - Deploy to multiple clients
 - Limit resource usage of multiple applications
 - Checking to see if the app is actually deployed and available
 - Command line upload/automagic deploy
 - Lots of other stuff, whoohoo.