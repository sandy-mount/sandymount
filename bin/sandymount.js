#!/usr/bin/env node

/**
 * Sandymount CLI
 *
 * SAND Stack: Solid + ActivityPub + Nostr + DID
 *
 * Usage:
 *   sandymount [options]   Start the SAND server (default)
 *   sandymount help        Show help
 */

import { spawn } from 'child_process';

const args = process.argv.slice(2);
const command = args[0];

const VERSION = '0.0.3';
const DEFAULT_PORT = 5420;

function showHelp() {
  console.log(`
🏖️  Sandymount v${VERSION}

SAND Stack: Solid + ActivityPub + Nostr + DID

Usage:
  sandymount [options]    Start the server (default)
  sandymount help         Show this help
  sandymount version      Show version

Options:
  --port <n>          Port to listen on (default: ${DEFAULT_PORT})
  --root <path>       Data directory (default: ./data)
  --no-nostr          Disable Nostr relay
  --no-git            Disable Git HTTP backend
  --idp               Enable identity provider
  --quiet             Suppress logs

Examples:
  npx sandymount
  sandymount
  sandymount --port 3000
  sand --idp

Website: https://sandy-mount.com
`);
}

function showVersion() {
  console.log(`sandymount v${VERSION}`);
}

function startServer(startArgs) {
  const jssArgs = ['start'];

  // Add default port if not specified
  if (!startArgs.includes('--port') && !startArgs.includes('-p')) {
    jssArgs.push('--port', String(DEFAULT_PORT));
  }

  // Add defaults: nostr and git ON unless disabled
  if (!startArgs.includes('--nostr') && !startArgs.includes('--no-nostr')) {
    jssArgs.push('--nostr');
  }
  if (!startArgs.includes('--git') && !startArgs.includes('--no-git')) {
    jssArgs.push('--git');
  }

  // Pass through all other args
  jssArgs.push(...startArgs);

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
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  case 'version':
  case '--version':
  case '-v':
    showVersion();
    break;
  case 'start':
    // Explicit start, pass args after 'start'
    startServer(args.slice(1));
    break;
  default:
    // No command or unknown = start server, pass all args
    startServer(args);
    break;
}
