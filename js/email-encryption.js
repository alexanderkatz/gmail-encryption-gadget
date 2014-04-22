var message = "This is the very secret message";

document.getElementById('message-text').innerHTML = message;
var key = generateDESKey();
var encrypted = CryptoJS.TripleDES.encrypt(message, key);
var e_msg = encrypted.toString();
document.getElementById('encrytped-message').innerHTML = e_msg;
console.log(e_msg);

var decrypted = CryptoJS.TripleDES.decrypt(e_msg, key);
var d_msg = decrypted.toString(CryptoJS.enc.Utf8);
document.getElementById('decrypted-message').innerHTML = d_msg;
console.log(d_msg);


function generateDESKey() {
	var rando = ((Math.random() + 1).toString(36) + (Math.random() + 1).toString(36)).substring(0, 24);
	document.getElementById('secrets').innerHTML = rando;
	return rando;
}
// put random string in as the secret key
// encrypt message


// make random string
// encrypt using RSA



$(function () {

	//Change the key size value for new keys
	$(".change-key-size").each(function (index, value) {
		var el = $(value);
		var keySize = el.attr('data-value');
		el.click(function (e) {
			var button = $('#key-size');
			button.attr('data-value', keySize);
			button.html(keySize + ' bit <span class="caret"></span>');
			e.preventDefault();
		});
	});

	// Execute when they click the button.
	$('#execute').click(function () {

		// Create the encryption object.
		var crypt = new JSEncrypt();

		// Set the private.
		crypt.setPrivateKey($('#privkey').val());
		//return;
		// If no public key is set then set it here...
		var pubkey = $('#pubkey').val();
		if (!pubkey) {
			$('#pubkey').val(crypt.getPublicKey());
		}

		// Get the input and crypted values.
		var input = $('#input').val();
		var crypted = $('#crypted').val();

		// Alternate the values.
		if (input) {
			$('#crypted').val(crypt.encrypt(input));
			$('#input').val('');
		} else if (crypted) {
			var decrypted = crypt.decrypt(crypted);
			if (!decrypted)
				decrypted = 'This is a test!';
			$('#input').val(decrypted);
			$('#crypted').val('');
		}
	});

	// If they wish to generate new keys.
	$('#generate').click(function () {
		var sKeySize = $('#key-size').attr('data-value');
		var keySize = parseInt(sKeySize);
		crypt = new JSEncrypt({
			default_key_size: keySize
		});
		var async = $('#async-ck').is(':checked');
		var dt = new Date();
		var time = -(dt.getTime());
		if (async) {
			$('#time-report').text('.');
			var load = setInterval(function () {
				var text = $('#time-report').text();
				$('#time-report').text(text + '.');
			}, 500);
			crypt.getKey(function () {
				clearInterval(load);
				dt = new Date();
				time += (dt.getTime());
				$('#time-report').text('Generated in ' + time + ' ms');
				$('#privkey').val(crypt.getPrivateKey());
				$('#pubkey').val(crypt.getPublicKey());
			});
			return;
		}
		crypt.getKey();
		dt = new Date();
		time += (dt.getTime());
		$('#time-report').text('Generated in ' + time + ' ms');
		$('#privkey').val(crypt.getPrivateKey());
		$('#pubkey').val(crypt.getPublicKey());
	});
});