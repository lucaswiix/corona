import quarentena from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const envConfigFilePath = path.resolve(
  __dirname,
  '..',
  process.env.ENV_FILE_PATH || '.env'
);

(async () => {
  if (!fs.existsSync(envConfigFilePath)) {
    await checkEncryptedConfigFiles();
  }
  require('dotenv').config({ path: envConfigFilePath });

  const app = () => require('./app').default();
  quarentena.version('v0.1.0');

  // Main command, Web Application
  quarentena.command('app').action(app);

  quarentena.on('command:*', () => {
    console.error('Invalid command');
    process.exit(1);
  });

  quarentena.parse(process.argv);
})();

async function checkEncryptedConfigFiles() {
  if (!process.env.CIPHER_KEY || !process.env.ENV_FILE_PATH) {
    return;
  }
  const envPathEnc = envConfigFilePath + '.enc';
  if (!fs.existsSync(envConfigFilePath) && fs.existsSync(envPathEnc)) {
    const { decryptFile } = require('./util/CryptoUtils');
    await decryptFile(envPathEnc, envConfigFilePath);
  }

}
