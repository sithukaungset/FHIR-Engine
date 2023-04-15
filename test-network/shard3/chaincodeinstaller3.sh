

#export FABRIC_CFG_PATH="${DIR}/../config"
#export PATH="${DIR}/../bin:${PWD}:$PATH"


export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/../organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/../organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp

export CORE_PEER_ADDRESS=peer0.org3.example.com:30051
export CORE_PEER_ADDRESS=localhost:30051

export CORE_PEER_ADDRESS=peer1.org3.example.com:8151
export CORE_PEER_ADDRESS=localhost:8151


export CORE_PEER_ADDRESS=peer2.org3.example.com:11151
export CORE_PEER_ADDRESS=localhost:11151 
export CORE_PEER_ADDRESS=peer3.org3.example.com:12151
export CORE_PEER_ADDRESS=localhost:12151 
export CORE_PEER_ADDRESS=peer4.org3.example.com:13151
export CORE_PEER_ADDRESS=localhost:13151 
export CORE_PEER_ADDRESS=peer5.org3.example.com:14151
export CORE_PEER_ADDRESS=localhost:14151 
export CORE_PEER_ADDRESS=peer6.org3.example.com:15151
export CORE_PEER_ADDRESS=localhost:15151 
export CORE_PEER_ADDRESS=peer7.org3.example.com:16151
export CORE_PEER_ADDRESS=localhost:16151 
export CORE_PEER_ADDRESS=peer8.org3.example.com:17151
export CORE_PEER_ADDRESS=localhost:17151 
export CORE_PEER_ADDRESS=peer9.org3.example.com:18051
export CORE_PEER_ADDRESS=localhost:18051 
    
export CORE_PEER_ADDRESS=peer10.org3.example.com:19051
export CORE_PEER_ADDRESS=localhost:19051 
    
export CORE_PEER_ADDRESS=peer11.org3.example.com:20051
export CORE_PEER_ADDRESS=localhost:20051 
    
export CORE_PEER_ADDRESS=peer12.org3.example.com:21051
export CORE_PEER_ADDRESS=localhost:21051 
    
export CORE_PEER_ADDRESS=peer13.org3.example.com:22051
export CORE_PEER_ADDRESS=localhost:22051 
    
export CORE_PEER_ADDRESS=peer14.org3.example.com:23051
export CORE_PEER_ADDRESS=localhost:23051 
    
export CORE_PEER_ADDRESS=peer15.org3.example.com:24051
export CORE_PEER_ADDRESS=localhost:24051 
    
export CORE_PEER_ADDRESS=peer16.org3.example.com:25051
export CORE_PEER_ADDRESS=localhost:25051 
    
export CORE_PEER_ADDRESS=peer17.org3.example.com:26051
export CORE_PEER_ADDRESS=localhost:26051 
    
export CORE_PEER_ADDRESS=peer18.org3.example.com:44151
export CORE_PEER_ADDRESS=localhost:44151 
    
export CORE_PEER_ADDRESS=peer19.org3.example.com:28051
export CORE_PEER_ADDRESS=localhost:28051 
    
export CORE_PEER_ADDRESS=peer20.org3.example.com:29051
export CORE_PEER_ADDRESS=localhost:29051 
    
export CORE_PEER_ADDRESS=peer21.org3.example.com:31051
export CORE_PEER_ADDRESS=localhost:31051 
    
export CORE_PEER_ADDRESS=peer22.org3.example.com:32051
export CORE_PEER_ADDRESS=localhost:32051 
    
export CORE_PEER_ADDRESS=peer23.org3.example.com:33051
export CORE_PEER_ADDRESS=localhost:33051 
    
export CORE_PEER_ADDRESS=peer24.org3.example.com:34051
export CORE_PEER_ADDRESS=localhost:34051 
    
export CORE_PEER_ADDRESS=peer25.org3.example.com:35051
export CORE_PEER_ADDRESS=localhost:35051 
    
export CORE_PEER_ADDRESS=peer26.org3.example.com:36051
export CORE_PEER_ADDRESS=localhost:36051 
    
export CORE_PEER_ADDRESS=peer27.org3.example.com:37051
export CORE_PEER_ADDRESS=localhost:37051 
    
export CORE_PEER_ADDRESS=peer28.org3.example.com:38051
export CORE_PEER_ADDRESS=localhost:38051 
    
export CORE_PEER_ADDRESS=peer29.org3.example.com:39051
export CORE_PEER_ADDRESS=localhost:39051 
    
export CORE_PEER_ADDRESS=peer30.org3.example.com:40051
export CORE_PEER_ADDRESS=localhost:40051 
    
export CORE_PEER_ADDRESS=peer31.org3.example.com:41051
export CORE_PEER_ADDRESS=localhost:41051 
    
export CORE_PEER_ADDRESS=peer32.org3.example.com:42051
export CORE_PEER_ADDRESS=localhost:42051 
    
export CORE_PEER_ADDRESS=peer33.org3.example.com:43051
export CORE_PEER_ADDRESS=localhost:43051


export PATH=$PATH:$PWD/../../bin/

export FABRIC_CFG_PATH=$PWD/../../config/
export ORDERER_CA=${PWD}/../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem