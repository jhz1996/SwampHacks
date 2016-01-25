// node_example.js - Example showing use of Clarifai node.js API
var s=5;
var Clarifai = require('./clarifai_node.js');
var keys = require('./Keys');
var tagsList;
var arrayTags;

console.log(s);

Clarifai.initAPI(keys.CLIENT_ID, keys.CLIENT_SECRET);


var stdio = require('stdio');

// support some command-line options
var opts = stdio.getopt( {
	'print-results' : { description: 'print results'},
	'print-http' : { description: 'print HTTP requests and responses'},
	'verbose' : { key : 'v', description: 'verbose output'}
});
var verbose = opts["verbose"];
Clarifai.setVerbose( verbose );
if( opts["print-http"] ) {
	Clarifai.setLogHttp( true ) ;
}

if(verbose) console.log("using CLIENT_ID="+Clarifai._clientId+", CLIENT_SECRET="+Clarifai._clientSecret);

function commonResultHandler( err, res ) {
	if( err != null ) {
		if( typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
			console.log("TAG request timed out");
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
			console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
			console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
			console.log("Clarifai host is throttling this application.");				
		}
		else {
			console.log("TAG request encountered an unexpected error: ");
			console.log(err);				
		}
	}
	else {

		if( opts["print-results"] ) {
			// if some images were successfully tagged and some encountered errors,
			// the status_code PARTIAL_ERROR is returned. In this case, we inspect the
			// status_code entry in each element of res["results"] to evaluate the individual
			// successes and errors. if res["status_code"] === "OK" then all images were 
			// successfully tagged.

			if( typeof res["status_code"] === "string" && 
				( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {

				// the request completed successfully
				for( i = 0; i < res.results.length; i++ ) {
					console.log(i);
					if( res["results"][i]["status_code"] === "OK" ) {
						
						console.log( 'docid='+res.results[i].docid +
							' local_id='+res.results[i].local_id +
							' tags='+res["results"][i].result["tag"]["classes"] )
						tagsList=res["results"][i].result["tag"]["classes"];
						console.log(typeof(tagsList));

						
						for (var prop in tagsList) {
    					arr.push(tagsList[prop]);
						}
						console.log(arr[1]);

						//arrayTags=tagsList.split(',');
						
					}
					else {
						console.log( 'docid='+res.results[i].docid +
							' local_id='+res.results[i].local_id + 
							' status_code='+res.results[i].status_code +
							' error = '+res.results[i]["result"]["error"] )
					}
				}

			}
		}

				
	}
}

// exampleTagSingleURL() shows how to request the tags for a single image URL
function exampleTagSingleURL() {
	var testImageURL = "http://www.clarifai.com/img/metro-north.jpg";
	var ourId = "train station 1"; // this is any string that identifies the image to your system

	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 

	Clarifai.tagURL( testImageURL , ourId, commonResultHandler );  
	

}




exampleTagSingleURL();