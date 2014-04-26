// Put in placeholder message
document.getElementById('message').innerHTML = "This is the very secret message";

var key = generateDESKey();

// generate new key
document.getElementById('genKeyB').addEventListener("click", function () {
	key = generateDESKey();
	document.getElementById('encryptPassphrase').innerHTML = key;

}, false);

// Generate DES Key
function generateDESKey() {
	var rando = ((Math.random() + 1).toString(36) + (Math.random() + 1).toString(36).substring(3,20)).substring(3, 28);
	document.getElementById('secretKey').value = rando;
	console.log("rando " + rando);
	document.getElementById('encryptPassphrase').innerHTML = rando;
	return rando;
}

// Button so user can specify their own key
document.getElementById('useKeyB').addEventListener("click", function () {
	key = document.getElementById('secretKey').value;
	document.getElementById('encryptPassphrase').innerHTML = key;
}, false);

// Variable to store Encrypted Message
var e_msg;


// ENCRYPT MESSAGE
// Get encrypt button and add an event listener
var encryptButton = document.getElementById('encryptB');
encryptButton.addEventListener("click", function () {
	var message = document.getElementById('message').value;
	console.log("mt: " + message);
	console.log("key: " + key);
	var encrypted = CryptoJS.TripleDES.encrypt(message, key);
	e_msg = encrypted.toString();
	document.getElementById('encrypted').innerHTML = e_msg;
}, false);

// DECRYPT MESSAGE
// Get decrypt button and add an event listener
var decryptButton = document.getElementById('decryptB');
decryptButton.addEventListener("click", function () {
	var decrypted = CryptoJS.TripleDES.decrypt(e_msg, key);
	var d_msg = decrypted.toString(CryptoJS.enc.Utf8);
	document.getElementById('decrypted').innerHTML = d_msg;
}, false);




// put random string in as the secret key
// encrypt message
// make random string
// encrypt using RSA

// encrypt secret passphrase with js encrypt


// RSA ENCRYPTION, TAKEN FROM JS ENCRYPT ***********************************************

var crypt;
var encryptedPass;

// If they wish to generate new keys.
$('#genRSAB').click(function () {
	// Hard coded key size
	var keySize = 1024;
	crypt = new JSEncrypt({
		default_key_size: keySize
	});
	crypt.getKey();
	console.log("hey" + crypt.getPrivateKey());
	document.getElementById('privKey').innerHTML = crypt.getPrivateKey();
	document.getElementById('pubKey').innerHTML = crypt.getPublicKey();
});

// Encrypt Passphrase
$('#encryptPPB').click(function () {
	if (!crypt) {
		window.alert("Please generate RSA keys");
	} else {
		encryptedPass = crypt.encrypt(key);
		document.getElementById('encryptedPassphrase').innerHTML = "Your encrypted passphrase is \n" + encryptedPass;
	}
});
// Decrypt Passphrase
$('#decryptPPB').click(function () {
	var decryptedPass = crypt.decrypt(encryptedPass);
	document.getElementById('encryptedPassphrase').innerHTML = "Your decrypted passphrase is \n" + decryptedPass;
});