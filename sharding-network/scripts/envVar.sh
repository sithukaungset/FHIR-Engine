#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
# 

# This is a collection of bash functions used by different scripts

source scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export ORDERER1_CA=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer1.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

export PEER0_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export PEER1_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt
export PEER2_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt
export PEER3_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt
export PEER4_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt
export PEER5_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt
export PEER6_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt
export PEER7_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt
export PEER8_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer8.org1.example.com/tls/ca.crt




export PEER0_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export PEER1_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt
export PEER2_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt
export PEER3_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt
export PEER4_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt
export PEER5_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt
export PEER6_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt
export PEER7_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt
export PEER8_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer8.org2.example.com/tls/ca.crt
export PEER9_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer9.org2.example.com/tls/ca.crt
export PEER10_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer10.org2.example.com/tls/ca.crt
export PEER11_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer11.org2.example.com/tls/ca.crt
export PEER12_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer12.org2.example.com/tls/ca.crt
export PEER13_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer13.org2.example.com/tls/ca.crt
export PEER14_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer14.org2.example.com/tls/ca.crt
export PEER15_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer15.org2.example.com/tls/ca.crt
export PEER16_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer16.org2.example.com/tls/ca.crt
export PEER17_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer17.org2.example.com/tls/ca.crt
export PEER18_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer18.org2.example.com/tls/ca.crt
export PEER19_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer19.org2.example.com/tls/ca.crt
export PEER20_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer20.org2.example.com/tls/ca.crt
export PEER21_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer21.org2.example.com/tls/ca.crt
export PEER22_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer22.org2.example.com/tls/ca.crt
export PEER23_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer23.org2.example.com/tls/ca.crt
export PEER24_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer24.org2.example.com/tls/ca.crt
export PEER25_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer25.org2.example.com/tls/ca.crt
export PEER26_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer26.org2.example.com/tls/ca.crt
export PEER27_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer27.org2.example.com/tls/ca.crt
export PEER28_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer28.org2.example.com/tls/ca.crt
export PEER29_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer29.org2.example.com/tls/ca.crt
export PEER30_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer30.org2.example.com/tls/ca.crt
export PEER31_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer31.org2.example.com/tls/ca.crt
export PEER32_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer32.org2.example.com/tls/ca.crt
export PEER33_ORG2_CA=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer33.org2.example.com/tls/ca.crt


export PEER0_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export PEER1_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer1.org3.example.com/tls/ca.crt
export PEER2_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer2.org3.example.com/tls/ca.crt
export PEER3_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer3.org3.example.com/tls/ca.crt
export PEER4_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer4.org3.example.com/tls/ca.crt
export PEER5_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer5.org3.example.com/tls/ca.crt
export PEER6_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer6.org3.example.com/tls/ca.crt
export PEER7_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer7.org3.example.com/tls/ca.crt
export PEER8_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer8.org3.example.com/tls/ca.crt
export PEER9_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer9.org3.example.com/tls/ca.crt
export PEER10_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer10.org3.example.com/tls/ca.crt
export PEER11_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer11.org3.example.com/tls/ca.crt
export PEER12_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer12.org3.example.com/tls/ca.crt
export PEER13_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer13.org3.example.com/tls/ca.crt
export PEER14_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer14.org3.example.com/tls/ca.crt
export PEER15_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer15.org3.example.com/tls/ca.crt
export PEER16_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer16.org3.example.com/tls/ca.crt
export PEER17_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer17.org3.example.com/tls/ca.crt
export PEER18_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer18.org3.example.com/tls/ca.crt
export PEER19_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer19.org3.example.com/tls/ca.crt
export PEER20_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer20.org3.example.com/tls/ca.crt
export PEER21_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer21.org3.example.com/tls/ca.crt
export PEER22_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer22.org3.example.com/tls/ca.crt
export PEER23_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer23.org3.example.com/tls/ca.crt
export PEER24_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer24.org3.example.com/tls/ca.crt
export PEER25_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer25.org3.example.com/tls/ca.crt
export PEER26_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer26.org3.example.com/tls/ca.crt
export PEER27_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer27.org3.example.com/tls/ca.crt
export PEER28_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer28.org3.example.com/tls/ca.crt
export PEER29_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer29.org3.example.com/tls/ca.crt
export PEER30_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer30.org3.example.com/tls/ca.crt
export PEER31_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer31.org3.example.com/tls/ca.crt
export PEER32_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer32.org3.example.com/tls/ca.crt
export PEER33_ORG3_CA=${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer33.org3.example.com/tls/ca.crt

export PEER0_ORG4_CA=${PWD}/organizations/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt

# Set OrdererOrg.Admin globals
setOrdererGlobals() {
  export CORE_PEER_LOCALMSPID="OrdererMSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
  export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp
}

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=""
  local PEER=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
 
  infoln "Using organization ${USING_ORG}"

  if [ $USING_ORG -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    export PATH=$PATH:$PWD/../../bin/
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    if [ PEER="0" ]; then
      export CORE_PEER_ADDRESS=peer0.org1.example.com:7051
      export CORE_PEER_ADDRESS=localhost:7051 
    elif [ PEER="1" ]; then
      export CORE_PEER_ADDRESS=peer1.org1.example.com:8051
      export CORE_PEER_ADDRESS=localhost:8051 
    elif [ PEER="2" ]; then
      export CORE_PEER_ADDRESS=peer2.org1.example.com:11051
      export CORE_PEER_ADDRESS=localhost:11051 
    elif [ PEER="3" ]; then
      export CORE_PEER_ADDRESS=peer3.org1.example.com:12051
      export CORE_PEER_ADDRESS=localhost:12051 
    elif [ PEER="4" ]; then
      export CORE_PEER_ADDRESS=peer4.org1.example.com:13051
      export CORE_PEER_ADDRESS=localhost:13051 
    elif [ PEER="5" ]; then
      export CORE_PEER_ADDRESS=peer5.org1.example.com:14051
      export CORE_PEER_ADDRESS=localhost:14051 
    elif [ PEER="6" ]; then
      export CORE_PEER_ADDRESS=peer6.org1.example.com:15051
      export CORE_PEER_ADDRESS=localhost:15051 
    elif [ PEER="7" ]; then
      export CORE_PEER_ADDRESS=peer7.org1.example.com:16051
      export CORE_PEER_ADDRESS=localhost:16051 
    elif [ PEER="8" ]; then
      export CORE_PEER_ADDRESS=peer8.org1.example.com:17051
      export CORE_PEER_ADDRESS=localhost:17051 


    else
      echo "NO MORE PEERS"
    fi
   




  elif [ $USING_ORG -eq 2 ]; then
    export CORE_PEER_LOCALMSPID="Org2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    
    if [ PEER="0" ]; then
      export CORE_PEER_ADDRESS=peer0.org2.example.com:9051
      export CORE_PEER_ADDRESS=localhost:9051  
    elif [ PEER="1" ]; then
      export CORE_PEER_ADDRESS=peer1.org2.example.com:50051
      export CORE_PEER_ADDRESS=localhost:50051 
    elif [ PEER="2" ]; then
      export CORE_PEER_ADDRESS=peer2.org2.example.com:51051
      export CORE_PEER_ADDRESS=localhost:51051 
    elif [ PEER="3" ]; then
      export CORE_PEER_ADDRESS=peer3.org2.example.com:52051
      export CORE_PEER_ADDRESS=localhost:52051 
    elif [ PEER="4" ]; then
      export CORE_PEER_ADDRESS=peer4.org2.example.com:53051
      export CORE_PEER_ADDRESS=localhost:53051 
    elif [ PEER="5" ]; then
      export CORE_PEER_ADDRESS=peer5.org2.example.com:54051
      export CORE_PEER_ADDRESS=localhost:54051 
    elif [ PEER="6" ]; then
      export CORE_PEER_ADDRESS=peer6.org2.example.com:55051
      export CORE_PEER_ADDRESS=localhost:55051 
    elif [ PEER="7" ]; then
      export CORE_PEER_ADDRESS=peer7.org2.example.com:56051
      export CORE_PEER_ADDRESS=localhost:56051 
    elif [ PEER="8" ]; then
      export CORE_PEER_ADDRESS=peer8.org2.example.com:57051
      export CORE_PEER_ADDRESS=localhost:57051 
    elif [ PEER="9" ]; then
      export CORE_PEER_ADDRESS=peer9.org2.example.com:58051
      export CORE_PEER_ADDRESS=localhost:58051 
    elif [ PEER="10" ]; then
      export CORE_PEER_ADDRESS=peer10.org2.example.com:59051
      export CORE_PEER_ADDRESS=localhost:59051 
    elif [ PEER="11" ]; then
      export CORE_PEER_ADDRESS=pee11.org2.example.com:20151
      export CORE_PEER_ADDRESS=localhost:20151 
    elif [ PEER="12" ]; then
      export CORE_PEER_ADDRESS=peer12.org2.example.com:21151
      export CORE_PEER_ADDRESS=localhost:21151 
    elif [ PEER="13" ]; then
      export CORE_PEER_ADDRESS=peer13.org2.example.com:22151
      export CORE_PEER_ADDRESS=localhost:22151 
    elif [ PEER="14" ]; then
      export CORE_PEER_ADDRESS=peer14.org2.example.com:23151
      export CORE_PEER_ADDRESS=localhost:23151 
    elif [ PEER="15" ]; then
      export CORE_PEER_ADDRESS=peer15.org2.example.com:24151
      export CORE_PEER_ADDRESS=localhost:24151 
    elif [ PEER="16" ]; then
      export CORE_PEER_ADDRESS=peer16.org2.example.com:25151
      export CORE_PEER_ADDRESS=localhost:25151 
    elif [ PEER="17" ]; then
      export CORE_PEER_ADDRESS=peer17.org2.example.com:26151
      export CORE_PEER_ADDRESS=localhost:26151 
    elif [ PEER="18" ]; then
      export CORE_PEER_ADDRESS=peer18.org2.example.com:45151
      export CORE_PEER_ADDRESS=localhost:45151 
    elif [ PEER="19" ]; then
      export CORE_PEER_ADDRESS=peer19.org2.example.com:28151
      export CORE_PEER_ADDRESS=localhost:28151 
    elif [ PEER="20" ]; then
      export CORE_PEER_ADDRESS=peer20.org2.example.com:29151
      export CORE_PEER_ADDRESS=localhost:29151 
    elif [ PEER="21" ]; then
      export CORE_PEER_ADDRESS=peer21.org2.example.com:31151
      export CORE_PEER_ADDRESS=localhost:31151 
    elif [ PEER="22" ]; then
      export CORE_PEER_ADDRESS=peer22.org2.example.com:32151
      export CORE_PEER_ADDRESS=localhost:32151 
    elif [ PEER="23" ]; then
      export CORE_PEER_ADDRESS=peer23.org2.example.com:33151
      export CORE_PEER_ADDRESS=localhost:33151 
    elif [ PEER="24" ]; then
      export CORE_PEER_ADDRESS=peer24.org2.example.com:34151
      export CORE_PEER_ADDRESS=localhost:34151 
    elif [ PEER="25" ]; then
      export CORE_PEER_ADDRESS=peer25.org2.example.com:35151
      export CORE_PEER_ADDRESS=localhost:35151 
    elif [ PEER="26" ]; then
      export CORE_PEER_ADDRESS=peer26.org2.example.com:36151
      export CORE_PEER_ADDRESS=localhost:36151 
    elif [ PEER="27" ]; then
      export CORE_PEER_ADDRESS=peer27.org2.example.com:37151
      export CORE_PEER_ADDRESS=localhost:37151 
    elif [ PEER="28" ]; then
      export CORE_PEER_ADDRESS=peer28.org2.example.com:38151
      export CORE_PEER_ADDRESS=localhost:38151 
    elif [ PEER="29" ]; then
      export CORE_PEER_ADDRESS=peer29.org2.example.com:39151
      export CORE_PEER_ADDRESS=localhost:39151 
    elif [ PEER="30" ]; then
      export CORE_PEER_ADDRESS=peer30.org2.example.com:40151
      export CORE_PEER_ADDRESS=localhost:40151 
    elif [ PEER="31" ]; then
      export CORE_PEER_ADDRESS=peer31.org2.example.com:41151
      export CORE_PEER_ADDRESS=localhost:41151 
    elif [ PEER="32" ]; then
      export CORE_PEER_ADDRESS=peer32.org2.example.com:42151
      export CORE_PEER_ADDRESS=localhost:42151 
    elif [ PEER="33" ]; then
      export CORE_PEER_ADDRESS=peer33.org2.example.com:43151
      export CORE_PEER_ADDRESS=localhost:43151

    else
      echo "NO MORE PEERS"
    fi
    
  elif [ $USING_ORG -eq 3 ]; then
    export CORE_PEER_LOCALMSPID="Org3MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
    
    if [ PEER="0" ]; then
      export CORE_PEER_ADDRESS=peer0.org3.example.com:30051  
      export CORE_PEER_ADDRESS=localhost:30051
    elif [ PEER="1" ]; then
      export CORE_PEER_ADDRESS=peer1.org3.example.com:8151
      export CORE_PEER_ADDRESS=localhost:8151 
    elif [ PEER="2" ]; then
      export CORE_PEER_ADDRESS=peer2.org3.example.com:11151
      export CORE_PEER_ADDRESS=localhost:11151 
    elif [ PEER="3" ]; then
      export CORE_PEER_ADDRESS=peer3.org3.example.com:12151
      export CORE_PEER_ADDRESS=localhost:12151 
    elif [ PEER="4" ]; then
      export CORE_PEER_ADDRESS=peer4.org3.example.com:13151
      export CORE_PEER_ADDRESS=localhost:13151 
    elif [ PEER="5" ]; then
      export CORE_PEER_ADDRESS=peer5.org3.example.com:14151
      export CORE_PEER_ADDRESS=localhost:14151 
    elif [ PEER="6" ]; then
      export CORE_PEER_ADDRESS=peer6.org3.example.com:15151
      export CORE_PEER_ADDRESS=localhost:15151 
    elif [ PEER="7" ]; then
      export CORE_PEER_ADDRESS=peer7.org3.example.com:16151
      export CORE_PEER_ADDRESS=localhost:16151 
    elif [ PEER="8" ]; then
      export CORE_PEER_ADDRESS=peer8.org3.example.com:17151
      export CORE_PEER_ADDRESS=localhost:17151 
    elif [ PEER="9" ]; then
      export CORE_PEER_ADDRESS=peer9.org3.example.com:18051
      export CORE_PEER_ADDRESS=localhost:18051 
    elif [ PEER="10" ]; then
      export CORE_PEER_ADDRESS=peer10.org3.example.com:19051
      export CORE_PEER_ADDRESS=localhost:19051 
    elif [ PEER="11" ]; then
      export CORE_PEER_ADDRESS=peer11.org3.example.com:20051
      export CORE_PEER_ADDRESS=localhost:20051 
    elif [ PEER="12" ]; then
      export CORE_PEER_ADDRESS=peer12.org3.example.com:21051
      export CORE_PEER_ADDRESS=localhost:21051 
    elif [ PEER="13" ]; then
      export CORE_PEER_ADDRESS=peer13.org3.example.com:22051
      export CORE_PEER_ADDRESS=localhost:22051 
    elif [ PEER="14" ]; then
      export CORE_PEER_ADDRESS=peer14.org3.example.com:23051
      export CORE_PEER_ADDRESS=localhost:23051 
    elif [ PEER="15" ]; then
      export CORE_PEER_ADDRESS=peer15.org3.example.com:24051
      export CORE_PEER_ADDRESS=localhost:24051 
    elif [ PEER="16" ]; then
      export CORE_PEER_ADDRESS=peer16.org3.example.com:25051
      export CORE_PEER_ADDRESS=localhost:25051 
    elif [ PEER="17" ]; then
      export CORE_PEER_ADDRESS=peer17.org3.example.com:26051
      export CORE_PEER_ADDRESS=localhost:26051 
    elif [ PEER="18" ]; then
      export CORE_PEER_ADDRESS=peer18.org3.example.com:44151
      export CORE_PEER_ADDRESS=localhost:44151  
    elif [ PEER="19" ]; then
      export CORE_PEER_ADDRESS=peer19.org3.example.com:28051
      export CORE_PEER_ADDRESS=localhost:28051 
    elif [ PEER="20" ]; then
      export CORE_PEER_ADDRESS=peer20.org3.example.com:29051
      export CORE_PEER_ADDRESS=localhost:29051 
    elif [ PEER="21" ]; then
      export CORE_PEER_ADDRESS=peer21.org3.example.com:31051
      export CORE_PEER_ADDRESS=localhost:31051 
    elif [ PEER="22" ]; then
      export CORE_PEER_ADDRESS=peer22.org3.example.com:32051
      export CORE_PEER_ADDRESS=localhost:32051 
    elif [ PEER="23" ]; then
      export CORE_PEER_ADDRESS=peer23.org3.example.com:33051
      export CORE_PEER_ADDRESS=localhost:33051 
    elif [ PEER="24" ]; then
      export CORE_PEER_ADDRESS=peer24.org3.example.com:34051
      export CORE_PEER_ADDRESS=localhost:34051 
    elif [ PEER="25" ]; then
      export CORE_PEER_ADDRESS=peer25.org3.example.com:35051
      export CORE_PEER_ADDRESS=localhost:35051 
    elif [ PEER="26" ]; then
      export CORE_PEER_ADDRESS=peer26.org3.example.com:36051
      export CORE_PEER_ADDRESS=localhost:36051 
    elif [ PEER="27" ]; then
      export CORE_PEER_ADDRESS=peer27.org3.example.com:37051
      export CORE_PEER_ADDRESS=localhost:37051 
    elif [ PEER="28" ]; then
      export CORE_PEER_ADDRESS=peer28.org3.example.com:38051
      export CORE_PEER_ADDRESS=localhost:38051 
    elif [ PEER="29" ]; then
      export CORE_PEER_ADDRESS=peer29.org3.example.com:39051
      export CORE_PEER_ADDRESS=localhost:39051 
    elif [ PEER="30" ]; then
      export CORE_PEER_ADDRESS=peer30.org3.example.com:40051
      export CORE_PEER_ADDRESS=localhost:40051 
    elif [ PEER="31" ]; then
      export CORE_PEER_ADDRESS=peer31.org3.example.com:41051
      export CORE_PEER_ADDRESS=localhost:41051 
    elif [ PEER="32" ]; then
      export CORE_PEER_ADDRESS=peer32.org3.example.com:42051
      export CORE_PEER_ADDRESS=localhost:42051 
    elif [ PEER="33" ]; then
      export CORE_PEER_ADDRESS=peer33.org3.example.com:43051
      export CORE_PEER_ADDRESS=localhost:43051
    else
      echo "NO MORE PEERS"
    fi


  elif [ $USING_ORG -eq 4 ]; then
    export CORE_PEER_LOCALMSPID="Org4MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG4_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp
    
    if [ PEER="0" ]; then
      export CORE_PEER_ADDRESS=peer0.org4.example.com:30151  
      export CORE_PEER_ADDRESS=localhost:30151
    

    else
      echo "NO MORE PEERS"
    fi


  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {

  PEER_CONN_PARMS=""
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    for PEER in 0 1 2 3 4 5 6 7 8 9
    do
      if [ PEER="0" ]; then
        PEER="peer0.org$1"
      elif [ PEER="1" ]; then
        PEER="peer1.org$1"
      elif [ PEER="2" ]; then
        PEER="peer2.org$1"
      elif [ PEER="3" ]; then
        PEER="peer3.org$1"
      elif [ PEER="4" ]; then
        PEER="peer4.org$1"
      elif [ PEER="5" ]; then
        PEER="peer5.org$1"
      elif [ PEER="6" ]; then
        PEER="peer6.org$1"
      elif [ PEER="7" ]; then
        PEER="peer7.org$1"
      elif [ PEER="8" ]; then
        PEER="peer8.org$1"
      elif [ PEER="9" ]; then
        PEER="peer9.org$1"
      elif [ PEER="10" ]; then
        PEER="peer10.org$1"
      elif [ PEER="11" ]; then
        PEER="peer11.org$1"
      elif [ PEER="12" ]; then
        PEER="peer12.org$1"
      elif [ PEER="13" ]; then
        PEER="peer13.org$1"
      elif [ PEER="14" ]; then
        PEER="peer14.org$1"
      elif [ PEER="15" ]; then
        PEER="peer15.org$1"
      elif [ PEER="16" ]; then
        PEER="peer16.org$1"
      elif [ PEER="17" ]; then
        PEER="peer17.org$1"
      elif [ PEER="18" ]; then
        PEER="peer18.org$1"
      elif [ PEER="19" ]; then
        PEER="peer19.org$1"
      elif [ PEER="20" ]; then
        PEER="peer20.org$1"
      elif [ PEER="21" ]; then
        PEER="peer21.org$1"
      elif [ PEER="22" ]; then
        PEER="peer22.org$1"
      elif [ PEER="23" ]; then
        PEER="peer23.org$1"
      elif [ PEER="24" ]; then
        PEER="peer24.org$1"
      elif [ PEER="25" ]; then
        PEER="peer25.org$1"
      elif [ PEER="26" ]; then
        PEER="peer26.org$1"
      elif [ PEER="27" ]; then
        PEER="peer27.org$1"
      elif [ PEER="28" ]; then
        PEER="peer28.org$1"
      elif [ PEER="29" ]; then
        PEER="peer29.org$1"
      elif [ PEER="30" ]; then
        PEER="peer30.org$1"
      elif [ PEER="31" ]; then
        PEER="peer31.org$1"
      elif [ PEER="32" ]; then
        PEER="peer32.org$1"
      elif [ PEER="33" ]; then
        PEER="peer33.org$1"
      else
        echo "NO MORE PEERS"
      fi
    done
     
    ## Set peer addresses
    PEERS="$PEERS $PEER"
    PEER_CONN_PARMS="$PEER_CONN_PARMS --peerAddresses $CORE_PEER_ADDRESS"
    ## Set path to TLS certificate
    TLSINFO=$(eval echo "--tlsRootCertFiles \$PEER0_ORG$1_CA")
    PEER_CONN_PARMS="$PEER_CONN_PARMS $TLSINFO"
    # shift by one to get to the next organization
    shift
  done
  # remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
