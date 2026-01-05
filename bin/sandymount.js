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
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const VERSION = '0.0.8';
const DEFAULT_PORT = 5420;

function showBanner() {
  console.log(`
  ███████╗ █████╗ ███╗   ██╗██████╗
  ██╔════╝██╔══██╗████╗  ██║██╔══██╗
  ███████╗███████║██╔██╗ ██║██║  ██║
  ╚════██║██╔══██║██║╚██╗██║██║  ██║
  ███████║██║  ██║██║ ╚████║██████╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝

  🏖️  Sandymount v${VERSION}

  The SAND Stack: Solid + ActivityPub + Nostr + DID
  Your data. Your identity. Your rules.
`);
}

function showHelp() {
  showBanner();
  console.log(`Usage:
  sandymount [options]    Start the server (default)
  sandymount help         Show this help
  sandymount version      Show version

Options:
  --port <n>          Port to listen on (default: ${DEFAULT_PORT})
  --root <path>       Data directory (default: ./data)
  --no-nostr          Disable Nostr relay
  --no-git            Disable Git HTTP backend
  --idp               Enable identity provider
  --activitypub       Enable ActivityPub federation
  --quiet             Suppress logs

Examples:
  npx sandymount
  sandymount --port 3000
  sandymount --activitypub --idp

Website: https://sandy-mount.com
`);
}

function showVersion() {
  console.log(`sandymount v${VERSION}`);
}

function findJss() {
  // Try multiple locations for jss binary
  const locations = [
    // When installed as dependency (nested node_modules)
    join(__dirname, '..', 'node_modules', '.bin', 'jss'),
    // When using npx (hoisted node_modules)
    join(__dirname, '..', '..', '.bin', 'jss'),
    // Alternative hoisted location
    join(__dirname, '..', '..', 'javascript-solid-server', 'bin', 'jss.js'),
  ];

  for (const loc of locations) {
    if (existsSync(loc)) {
      return loc;
    }
  }
  return null;
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

  showBanner();

  // Determine what's enabled
  const port = startArgs.includes('--port') ? startArgs[startArgs.indexOf('--port') + 1] : DEFAULT_PORT;
  const dataDir = startArgs.includes('--root') ? startArgs[startArgs.indexOf('--root') + 1] : './data';
  const nostrEnabled = !startArgs.includes('--no-nostr');
  const gitEnabled = !startArgs.includes('--no-git');
  const apEnabled = startArgs.includes('--activitypub');
  const idpEnabled = startArgs.includes('--idp');

  // Show SAND stack status
  console.log('  ┌─────────────────────────────────────┐');
  console.log('  │  S  Solid        ✓ enabled         │');
  console.log(`  │  A  ActivityPub  ${apEnabled ? '✓ enabled         │' : '○ --activitypub   │'}`);
  console.log(`  │  N  Nostr        ${nostrEnabled ? '✓ enabled         │' : '○ disabled        │'}`);
  console.log(`  │  D  DID          ${idpEnabled ? '✓ enabled (IdP)   │' : '○ --idp           │'}`);
  console.log('  └─────────────────────────────────────┘');
  console.log('');
  console.log(`  Port: ${port}  Data: ${dataDir}  Git: ${gitEnabled ? '✓' : '○'}`);
  console.log('');

  // Find jss binary
  const jssPath = findJss();

  if (!jssPath) {
    console.error('  ❌ Error: JSS (JavaScript Solid Server) not found.');
    console.error('');
    console.error('  This usually means dependencies were not installed correctly.');
    console.error('  Try installing globally instead:');
    console.error('');
    console.error('    npm install -g sandymount');
    console.error('    sandymount');
    console.error('');
    process.exit(1);
  }

  const jss = spawn(jssPath, jssArgs, { stdio: 'inherit' });

  jss.on('error', (err) => {
    console.error('  ❌ Error:', err.message);
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
