var DHT_IOT = require('dht-iot');
var sensor = require('ds18x20');

// Clés de cryptage
var keypair = {publicKey:Buffer.from("6ef441733b1510cc5c93b7201e256b1d9605825e4ea0caca8e202193be090da4", 'hex'),
secretKey:Buffer.from("6809e0b94f41b1d72cbe29e433e488e1682c703f0ea6a2b5e8bb8a2e74bbf16811759cd5477a8f10b4d73e1f76aaaec81ea201d60ad0358e749c4d3426f5901a", 'hex')}



console.log("Hash : " + sha1(keypair.publicKey).toString('hex')) // Affichage du Hash
console.log()

send_temp();
setInterval(send_temp, 20000);

//Envoi de la donnée
function send_temp() {

  var value = get_temp();

  var dht_iot = new DHT_IOT({keypair: keypair})

  dht_iot.put(value).then(function(hash) {
    console.log(value);

    dht_iot.destroy();
  })
}

// Récupération de la température
function get_temp() {
  var tempstr = sensor.getAll();

  var temp = tempstr[Object.keys(tempstr)[0]];

  return temp;
}

function sha1 (buf) {
  return crypto.createHash('sha1').update(buf).digest()
}