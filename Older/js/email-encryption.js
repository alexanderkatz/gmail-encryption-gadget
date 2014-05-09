// Put in placeholder message
//document.getElementById('message-text').innerHTML = "This is the very secret message";

// generate key
var key = generateDESKey();

function generateDESKey() {
	var rando = ((Math.random() + 1).toString(36) + (Math.random() + 1).toString(36)).substring(2, 28);
	//document.getElementById('secrets').innerHTML = rando;
	return rando;
}

// Encrypted Message
var e_msg;



// ENCRYPT MESSAGE
// Get encrypt button and add an event listener
var encryptButton = document.getElementById('encrypt-button');
encryptButton.addEventListener("click", function () {
	var message = document.getElementById('message-text').value;
	console.log("mt: " + message);
	var encrypted = CryptoJS.TripleDES.encrypt(message, key);
	e_msg = encrypted.toString();
	document.getElementById('encrypted-text').innerHTML = e_msg;
}, false);

// DECRYPT MESSAGE
// Get decrypt button and add an event listener
var decryptButton = document.getElementById('decrypt-button');
decryptButton.addEventListener("click", function () {
	var decrypted = CryptoJS.TripleDES.decrypt(e_msg, key);
	var d_msg = decrypted.toString(CryptoJS.enc.Utf8);
	document.getElementById('decrypted-text').innerHTML = d_msg;
}, false);




// put random string in as the secret key
// encrypt message
// make random string
// encrypt using RSA

// encrypt secret passphrase with js encrypt


//$(function () {
//
//	//Change the key size value for new keys
//	$(".change-key-size").each(function (index, value) {
//		var el = $(value);
//		var keySize = el.attr('data-value');
//		el.click(function (e) {
//			var button = $('#key-size');
//			button.attr('data-value', keySize);
//			button.html(keySize + ' bit <span class="caret"></span>');
//			e.preventDefault();
//		});
//	});
//
//	// Execute when they click the button.
//	$('#execute').click(function () {
//
//		// Create the encryption object.
//		var crypt = new JSEncrypt();
//
//		// Set the private.
//		crypt.setPrivateKey($('#privkey').val());
//		//return;
//		// If no public key is set then set it here...
//		var pubkey = $('#pubkey').val();
//		if (!pubkey) {
//			$('#pubkey').val(crypt.getPublicKey());
//		}
//
//		// Get the input and crypted values.
//		var input = $('#input').val();
//		var crypted = $('#crypted').val();
//
//		// Alternate the values.
//		if (input) {
//			$('#crypted').val(crypt.encrypt(input));
//			$('#input').val('');
//		} else if (crypted) {
//			var decrypted = crypt.decrypt(crypted);
//			if (!decrypted)
//				decrypted = 'This is a test!';
//			$('#input').val(decrypted);
//			$('#crypted').val('');
//		}
//	});
//
//	// If they wish to generate new keys.
//	$('#generate').click(function () {
//		var sKeySize = $('#key-size').attr('data-value');
//		var keySize = parseInt(sKeySize);
//		crypt = new JSEncrypt({
//			default_key_size: keySize
//		});
//		var async = $('#async-ck').is(':checked');
//		var dt = new Date();
//		var time = -(dt.getTime());
//		if (async) {
//			$('#time-report').text('.');
//			var load = setInterval(function () {
//				var text = $('#time-report').text();
//				$('#time-report').text(text + '.');
//			}, 500);
//			crypt.getKey(function () {
//				clearInterval(load);
//				dt = new Date();
//				time += (dt.getTime());
//				$('#time-report').text('Generated in ' + time + ' ms');
//				$('#privkey').val(crypt.getPrivateKey());
//				$('#pubkey').val(crypt.getPublicKey());
//			});
//			return;
//		}
//		crypt.getKey();
//		dt = new Date();
//		time += (dt.getTime());
//		$('#time-report').text('Generated in ' + time + ' ms');
//		$('#privkey').val(crypt.getPrivateKey());
//		$('#pubkey').val(crypt.getPublicKey());
//	});
//});