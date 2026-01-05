#!/usr/bin/env node

/**
 * Sandymount CLI
 *
 * SAND Stack: Solid + ActivityPub + Nostr + DID
 *
 * Usage:
 *   sandymount start [options]   Start the SAND server
 *   sandymount help              Show help
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const args = process.argv.slice(2);
const command = args[0];

const VERSION = '0.0.2';

function showHelp() {
  console.log(`
🏖️  Sandymount v${VERSION}

SAND Stack: Solid + ActivityPub + Nostr + DID

Usage:
  sandymount start [options]   Start the server
  sandymount help              Show this help
  sandymount version           Show version

Start Options:
  --port <n>          Port to listen on (default: 3000)
  --root <path>       Data directory (default: ./data)
  --nostr             Enable Nostr relay
  --git               Enable Git HTTP backend
  --idp               Enable identity provider
  --quiet             Suppress logs

Examples:
  sandymount start
  sandymount start --port 8080 --nostr --git
  sand start --nostr --git

Website: https://sandy-mount.com
`);
}

function showVersion() {
  console.log(`sandymount v${VERSION}`);
}

function startServer() {
  // Pass through all arguments after 'start' to jss
  const jssArgs = ['start', ...args.slice(1)];

  // Add defaults if not specified
  if (!args.includes('--nostr') && !args.includes('--no-nostr')) {
    jssArgs.push('--nostr');
  }
  if (!args.includes('--git') && !args.includes('--no-git')) {
    jssArgs.push('--git');
  }

  console.log('');
  console.log('🏖️  Starting Sandymount...');
  console.log('');

  const jss = spawn('jss', jssArgs, { stdio: 'inherit' });

  jss.on('error', (err) => {
    if (err.code === 'ENOENT') {
      console.error('Error: JSS not found.');
      console.error('');
      console.error('JSS should be installed as a dependency. Try:');
      console.error('  npm install -g sandymount');
      console.error('');
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  });

  jss.on('exit', (code) => process.exit(code || 0));
}

// Main
switch (command) {
  case 'start':
    startServer();
    break;
  case 'version':
  case '--version':
  case '-v':
    showVersion();
    break;
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    showHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error('Run "sandymount help" for usage.');
    process.exit(1);
}
