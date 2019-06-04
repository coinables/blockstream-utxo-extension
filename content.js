var getdomain = window.location.hostname;
var alreadyopen = false;

if(getdomain == "blockstream.info"){
	var txboxes = document.getElementsByClassName("vout-header-container");
	var txboxeslen = txboxes.length;
	
	for(var i=0;i<txboxeslen;i++){
		//find each
		var thisios = document.getElementsByClassName("vout-header-container")[i];
		thisios.innerHTML += '<button id="selectutxo" class="selectutxo">Select UTXO</button>';
	}
	
	var selectbtns = document.getElementsByClassName("selectutxo");
	for(var i=0;i<selectbtns.length;i++){
		var selectbtn = selectbtns[i];
		selectbtn.onclick = function(){
			//check if one is already open if so reload page
			if(alreadyopen==true){
				location.reload();
			}
			
			var thistarget = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
	  
			 //console.log(thistarget.innerText);
			 var txidparent = thistarget.innerText;
			 var splittxid = txidparent.split("\t");
			 var thattxid = splittxid[0];
			 var thistxid = thattxid.replace("\n","");
			 var thisblock = this.parentElement;
			 var thisa = thisblock.getElementsByTagName("a")[0];
			 var thisaddy = thisa.innerText;
			 //console.log(thisaddy);
			 var thisamt = thisblock.getElementsByClassName("amount")[0].innerText;
			 var networkfind = thisamt.split(" ")[1];
			 
			 if(networkfind=="tBTC"){
					var networktype = "testnet";
			 } else {
					var networktype = null;
			 }
			 
			 //determine if p2pkh or p2sh or bech32
			 if(networktype == "testnet"){
					var substraddy = thisaddy.substr(0,1);
				if(substraddy == "2"){
					var inputtype = "3";
				} else if(substraddy == "m" || substraddy == "n"){
				  var inputtype = "1";
				} else if(substraddy == "t"){
					var inputtype = "b";
				}
			 } else {
			   //main net
			   var substraddy = thisaddy.substr(0,1);
				if(substraddy == "3"){
					var inputtype = "3";
				} else if(substraddy == "1"){
				  var inputtype = "1";
				} else if(substraddy == "b"){
					var inputtype = "b";
				}
			 }
			 
			 
			 var amtsplit = thisamt.split(" ")[0];
			 var amtconvert = amtsplit*100000000;
			 //console.log(networktype);
			 var thisnout = this.parentElement.parentElement.parentElement;
			 var parent = thisnout.parentNode;
			var childNodes = parent.childNodes;
			var count = childNodes.length;
			var child_index;
			for (var i = 0; i < count; ++i) {
			  if (thisnout === childNodes[i]) {
				child_index = i;
				break;
			  }
			}
			var thisnout = child_index;

			//build JSON
			var thisout = {type:inputtype, txid:thistxid, nout:thisnout, inputvalue:amtconvert, testnet:networktype};
			var thisoutstringed = JSON.stringify(thisout);
			var fee = "";
			this.parentElement.parentElement.innerHTML += '<br><input type="text" id="blockstreamplugin-input-out" placeholder="Where to send?"><br><input type="text" id="blockstreamplugin-input-amt" placeholder="Amount in satoshis?"><input type="hidden" id="blockstreamplugin-input-value" value="'+amtconvert+'"><br><input type="text" id="blockstreamplugin-fee" readonly><input type="text" id="blockstreamplugin-change" placeholder="Change if needed"><input type="hidden" id="blockstreamplugin-change-amt"> <br><br><textarea id="blockstreamplugin-output" cols="50" rows="5">'+thisoutstringed+'</textarea><br><button type="button" id="blockstreamplugin-button">Build Transaction</button>';
			
			var targetfeebox = document.getElementById("blockstreamplugin-fee");
			targetfeebox.style.backgroundColor = "#c3c3c3";
			var watchforoutfocus = document.getElementById("blockstreamplugin-input-amt");
			watchforoutfocus.onchange = function(){
				var fee = checkChange();
				document.getElementById("blockstreamplugin-fee").value = fee.toFixed(0);
				if(fee > 8000){
					//get change address
					var targetchangaddrbox = document.getElementById("blockstreamplugin-change");
					targetchangaddrbox.style.border = "2px solid red";
					var changeaddr = document.getElementById("blockstreamplugin-change").value;
					var minerfee = 4000;
					var changeamt = parseFloat(fee) - parseFloat(minerfee);
					document.getElementById("blockstreamplugin-change-amt").value = changeamt.toFixed(0);
				} else {
					//no change
					var targetchangaddrbox = document.getElementById("blockstreamplugin-change");
					targetchangaddrbox.style.border = "";
					document.getElementById("blockstreamplugin-change").value = null;
					var changeamt = 0;
					document.getElementById("blockstreamplugin-change-amt").value = changeamt.toFixed(0);
				}
			}

			var thisbtnevent = document.getElementById("blockstreamplugin-button");
			thisbtnevent.onclick = function(){
			  var stringed = document.getElementById("blockstreamplugin-output").innerHTML;
			  var jsonify = JSON.parse(stringed);
			  jsonify["output"] = document.getElementById("blockstreamplugin-input-out").value;
			  jsonify["outputamt"] = document.getElementById("blockstreamplugin-input-amt").value;
			  jsonify["change"] = document.getElementById("blockstreamplugin-change").value;
			  jsonify["changeamt"] = document.getElementById("blockstreamplugin-change-amt").value;
			  var updatedstringify = JSON.stringify(jsonify);
			  document.getElementById("blockstreamplugin-output").innerHTML = updatedstringify;
			}
			
			alreadyopen = false;
		}
			
	}
	
	function checkChange(){
		var amtin = document.getElementById("blockstreamplugin-input-value").value;
		var amtout = document.getElementById("blockstreamplugin-input-amt").value;
		
		return parseFloat(amtin) - parseFloat(amtout);
	}

	
	
}