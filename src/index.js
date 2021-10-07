var { createInterface } = require("readline");
var { createHash, createDecipheriv, createCipheriv } = require("crypto");

var readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

const encrypt = (value, key, iv) => {
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const encrypted = cipher.update(value, 'utf8', 'base64');
  
  return encrypted + cipher.final('base64');
}

const decrypt = (value, key, iv) => {
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = decipher.update(value, 'base64', 'utf8');
  
  return decrypted + decipher.final('utf8');
}

const prompt = (message) => new Promise((resolve) => {
  readline.question(`${message} : `, (value) => resolve(value));
});

const md5 = (value) => createHash('md5').update(value).digest('hex');



(async function () {
  const key = md5(await prompt('passphrase'));
  const iv = Buffer.from(key).toString('base64').substr(0, 16);
  const value = await prompt('value');
  
  console.log(encrypt(value, key, iv));
  // console.log(decrypt(value, key, iv));
  
  readline.close();
})();