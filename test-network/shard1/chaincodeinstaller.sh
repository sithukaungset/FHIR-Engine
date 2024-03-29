

#export FABRIC_CFG_PATH="${DIR}/../config"
#export PATH="${DIR}/../bin:${PWD}:$PATH"


export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/../organizations/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/../organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
export CORE_PEER_ADDRESS=localhost:7051 



export PATH=$PATH:$PWD/../../bin/

export FABRIC_CFG_PATH=$PWD/../../config/
export ORDERER_CA=${PWD}/../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem



