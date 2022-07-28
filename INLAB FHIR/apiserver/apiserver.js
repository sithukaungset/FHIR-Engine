var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require("cors");

// For CpListener
// const yaml = require('js-yaml');
// const { Wallets, Gateway } = require('fabric-network');
// const path = require("path");
// const fs = require("fs");
// let finished;

app.use(
    cors({
        origin:true,
        credentials:true,
        methods: ["POST","PUT","GET","OPTIONS","HEAD"]
    }
)
);

var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
app.use(express.static('css'));

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { json } = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//app.engine('pug', require('pug').__express)
// url('https://cdn.dribbble.com/users/662779/screenshots/5122311/server.gif');


app.engine('pug', require('pug').__express)
app.set("view engine", "pug");

app.get('/api/', function (req, res){
    res.render('index');
});

app.get('/api/create', function (req, res){
    res.render('create');
});

app.get('/api/createAcc', function (req, res){
    res.render('createAcc');
});

app.get('/api/query/', function (req, res){
    res.render('PHRindex');
});


app.get('/', function (req, res){
    res.render('login');
});

app.get('/api/buyer', async function (req,res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllEHRs');
        console.log(JSON.parse(result));
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.render('allvideos.html',{list:JSON.parse(result)});
        
        // Disconnect from the gateway.
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error:error});
        process.exit(1);
        }
        });

app.get('/api/seller', async function (req,res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllAccounts');
        console.log(JSON.parse(result));
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.render('allvideos.html',{list:JSON.parse(result)});
        // Disconnect from the gateway.
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error:error});
        process.exit(1);
        }
        });

// app.get('/api/queryallEHRs', async function (req,res){
//     try{
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//         return;
//         }
//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');
//         // Get the contract from the network.
//         const contract = network.getContract('inlab_fhir');
//         // Evaluate the specified transaction.
//         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
//         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
//         const result = await contract.evaluateTransaction('queryAllEHRs');
//         console.log(JSON.parse(result));
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         res.render('queryEHR',{list:JSON.parse(result)});
 
//         // Disconnect from the gateway.
//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error:error});
//         process.exit(1);
//         }
//         });

// app.get('/api/queryallEHRs', async function (req,res){
//     try{
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//         return;
//         }
//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');
//         // Get the contract from the network.
//         const contract = network.getContract('inlab_fhir');
//         // Evaluate the specified transaction.
//         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
//         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
//         const result = await contract.evaluateTransaction('queryAllEHRs');
//         console.log(JSON.parse(result));
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         res.render('queryEHR',{list:JSON.parse(result)});
 
//         // Disconnect from the gateway.
//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error:error});
//         process.exit(1);
//         }
//         });
app.get('/api/queryallEHRs', async function (req,res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllEHRs');
        console.log(JSON.parse(result));
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        //res.send("Successful Transaction");
        res.send({list:JSON.parse(result)});
 
        // Disconnect from the gateway.
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error:error});
        process.exit(1);
        }
        });
        
// app.get('/api/query/:video_index', async function(req, res){
//     try{
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//         return;
//         }
//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('shop_block');
//         // Evaluate the specified transaction.
//         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
//         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
//         const result = await contract.evaluateTransaction('queryVideo',req.params.video_index);
//         console.log(JSON.parse(result));
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         res.status(200).json({response: result.toString()});

//     }
//     catch (error) {
//     console.error(`Failed to evaluate transaction: ${error}`);
//     res.status(500).json({error:error});
//     process.exit(1);
//     }
//     });


app.get('/api/query/:PHR_index', async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryEHR',req.params.PHR_index);


        console.log(JSON.parse(result));
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        //res.send("Successful Transaction");
        res.send(JSON.parse(result));

    }
    catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({error:error});
    process.exit(1);
    }
    });

app.get('/api/Signin', async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryEHR',req.body.PHR_index);


        console.log(JSON.parse(result));
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        //res.send("Successful Transaction");
        res.send(JSON.parse(result));

    }
    catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({error:error});
    process.exit(1);
    }
    });
 
// Create Account
app.post('/api/createAcc/',  urlencodedParser, async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        await contract.submitTransaction('createEHR',req.body.AccountID,req.body.PersonName,'', '',req.body.PatientName,'', '','',req.body.CryptoBalance,req.body.phonenumber);
        console.log('Transaction has been submitted');
        res.send("Successful Transaction");
        //res.render('complete');
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
    }
    } )
app.post('/api/create/',  urlencodedParser, async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        await contract.submitTransaction('createEHR',req.body.EHRNumber,req.body.AccountID,req.body.DateTime, req.body.Organization,req.body.patientName,req.body.Function, req.body.data,req.body.PHRHash,req.body.checkingBalance,req.body.phonenumber);
        console.log('Health Data of User is successfully added to the INLAB FHIR Blockchain');
        res.send("Successful Transaction");
        //res.render('complete');
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
    }
    } )

app.put('/api/requestPHR/',  urlencodedParser, async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        await contract.submitTransaction('requestEHR',req.body.EHRNumber,req.body.doctor,req.body.maxtoken,req.body.data);
        console.log('Personal Health data is successfully requested');
        res.send("Successful Transaction");
        //res.render('complete');
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
    }
    } )


app.put('/api/responsePHR/',  urlencodedParser, async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        await contract.submitTransaction('requestEHR',req.body.EHRNumber,req.body.doctor,req.body.token,req.body.responsedata);
        console.log('Requested Personal Health data is successfully responsed');
        res.send("Successful Transaction");
        //res.render('complete');
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
    }
    } )


app.post('/api/sendPayment/',  urlencodedParser, async function(req, res){
    try{
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
        return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('inlab_fhir');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        await contract.submitTransaction('sendPayment',req.body.SenderName,req.body.ReceiverName, req.body.Price);
        console.log('Transaction has been submitted');
        console.log(`${req.body.SenderName} has successfully bought the item.`)
        res.send("Successful Transaction");
        // Disconnect from the gateway.
        await gateway.disconnect();
        

    } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
    }
    } )


app.get('/api/BlockScanner', async function (req,res){
    try {
        // Set up the wallet - just use Org2's wallet (isabella)
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new gateway for connecting to our peer node.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        
        const gateway = new Gateway();
        
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Load connection profile; will be used to locate a gateway
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.



  
        // connect to the gateway

        // Listen for blocks being added, display relevant contents: in particular, the transaction inputs
        finished = false;
        
        const listener = async (event) => {
            if (event.blockData !== undefined) {
                for (const i in event.blockData.data.data) {
                    if (event.blockData.data.data[i].payload.data.actions !== undefined) {
                        const inputArgs = event.blockData.data.data[i].payload.data.actions[0].payload.chaincode_proposal_payload.input.chaincode_spec.input.args;
                        // Print block details
                        console.log('----------');
                        console.log('Block:', parseInt(event.blockData.header.number), 'transaction', i);
                        // Show ID and timestamp of the transaction
                        const tx_id = event.blockData.data.data[i].payload.header.channel_header.tx_id;
                        const txTime = new Date(event.blockData.data.data[i].payload.header.channel_header.timestamp).toUTCString();
                        // Show ID, date and time of transaction
                        console.log('Transaction ID:', tx_id);
                        console.log('Timestamp:', txTime);
                        // Show transaction inputs (formatted, as may contain binary data)
                        let inputData = 'Inputs: ';
                        for (let j = 0; j < inputArgs.length; j++) {
                            const inputArgPrintable = inputArgs[j].toString().replace(/[^\x20-\x7E]+/g, '');
                            inputData = inputData.concat(inputArgPrintable, ' ');
                        }
                        console.log(inputData);
                        // Show the proposed writes to the world state
                        let keyData = 'Keys updated: ';
                        for (const l in event.blockData.data.data[i].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes) {
                            // add a ' ' space between multiple keys in 'concat'
                            keyData = keyData.concat(event.blockData.data.data[i].payload.data.actions[0].payload.action.proposal_response_payload.extension.results.ns_rwset[1].rwset.writes[l].key, ' ');
                        }
                        console.log(keyData);
                        // Show which organizations endorsed
                        let endorsers = 'Endorsers: ';
                        for (const k in event.blockData.data.data[i].payload.data.actions[0].payload.action.endorsements) {
                            endorsers = endorsers.concat(event.blockData.data.data[i].payload.data.actions[0].payload.action.endorsements[k].endorser.msp, ' ');
                        }
                        
                        console.log(endorsers);
                        
                        // Was the transaction valid or not?
                        // (Invalid transactions are still logged on the blockchain but don't affect the world state)
                        if ((event.blockData.metadata.metadata[2])[i] !== 0) {
                            console.log('INVALID TRANSACTION');
                        }
                    }
                }
            }
        };
        const options = {
            type: 'full',
            startBlock: 1
        };
        await network.addBlockListener(listener, options);
        
        while (!finished) {
            await new Promise(resolve => setTimeout(resolve, 500));
            // Disconnect from the gateway after Promise is resolved.
            res.send("Successful Transaction");

            // ... do other things
        }
        gateway.disconnect();
        
    }
    catch (error) {
        console.error('Error: ', error);
        process.exit(1);
    }

}
)

app.listen(22650,"203.247.240.226");

var http = require('http');
var os = require('os');
var versions_server = http.createServer( (request, response) => {
    response.end('Versions: ' + JSON.stringify(process.versions) +
                 ' listening on' + JSON.stringify(versions_server.address()) +
                 ' interfaces are ' + JSON.stringify(os.networkInterfaces()));
    });


