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

