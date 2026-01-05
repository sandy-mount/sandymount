<div align="center">

# 🏖️ Sandymount

## The SAND Stack

**S**olid · **A**ctivityPub · **N**ostr · **D**ID

*Personal sovereignty in one command*

[![npm version](https://img.shields.io/npm/v/sandymount.svg)](https://www.npmjs.com/package/sandymount)
[![License: AGPL](https://img.shields.io/badge/License-AGPL-blue.svg)](https://opensource.org/licenses/AGPL-3.0)

[Quick Start](#quick-start) · [Features](#features) · [Why SAND?](#why-sand) · [Roadmap](#roadmap)

---

</div>

## Quick Start

```bash
npm install -g sandymount
sandymount start
```

**That's it.** Your personal SAND server is running.

---

## What is SAND?

Four protocols, one stack, total sovereignty:

| | Protocol | What You Get |
|:---:|----------|--------------|
| **S** | [Solid](https://solidproject.org/) | Personal data pod — files, profiles, apps |
| **A** | [ActivityPub](https://activitypub.rocks/) | Federated social — Mastodon, Threads, WordPress |
| **N** | [Nostr](https://nostr.com/) | Censorship-resistant social — relays, zaps, keys |
| **D** | [DID](https://www.w3.org/TR/did-core/) | Decentralized identity — one key, every protocol |

---

## Features

### ✅ Available Now

| Feature | Description |
|---------|-------------|
| **Solid Pod** | Full LDP server with WebID, Web Access Control, Solid-OIDC |
| **Nostr Relay** | NIP-01 compliant, rate-limited, memory-efficient |
| **Git Server** | Clone and push repos via HTTP with WebID auth |
| **DID Resolution** | did:nostr → WebID, NIP-98 HTTP authentication |
| **Mobile Ready** | Runs on Android/Termux, ~100MB RAM |

### 🔜 Coming Soon

| Feature | Description |
|---------|-------------|
| **ActivityPub** | Mastodon-compatible federation via FedBox |
| **Unified Identity** | One keypair for Solid + AP + Nostr |
| **P2P Connectivity** | No VPS required |

---

## Installation

### Any Platform

```bash
npm install -g sandymount
sandymount start
```

### Android (Termux)

```bash
pkg install nodejs-lts
npm install -g sandymount pm2
pm2 start sandymount -- start
pm2 save
```

### With Options

```bash
sandymount start --port 3000 --nostr --git
```

---

## Endpoints

| Endpoint | Protocol | Description |
|----------|----------|-------------|
| `/` | Solid | Pod root, WebID profile |
| `/relay` | Nostr | WebSocket relay (wss://) |
| `/relay/info` | Nostr | NIP-11 relay metadata |
| `/.git` | Git | Clone/push repositories |
| `/.well-known/webfinger` | Discovery | WebFinger lookup |

---

## Why SAND?

### The Problem

| Your Life | Who Controls It |
|-----------|-----------------|
| Identity | Google, Apple, Facebook |
| Files | Dropbox, iCloud, Drive |
| Social | Twitter, Instagram, TikTok |
| Followers | The platform |

### The Solution

| SAND Protocol | What It Fixes |
|---------------|---------------|
| **DID** | You own your identity |
| **Solid** | You own your data |
| **Nostr** | You own your voice |
| **ActivityPub** | You own your social graph |

### The Vision

```
Your phone = Your server
Your key = Your identity
Your pod = Your data
Your relay = Your reach
```

**Zero to sovereignty in 60 seconds.**

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    SAND Stack                        │
├────────────┬────────────┬────────────┬──────────────┤
│   Solid    │ ActivityPub│   Nostr    │     DID      │
│   (LDP)    │   (AP)     │  (NIP-01)  │ (did:nostr)  │
├────────────┴────────────┴────────────┴──────────────┤
│                   Fastify Server                     │
├─────────────────────────────────────────────────────┤
│                     Filesystem                       │
└─────────────────────────────────────────────────────┘

One port · One process · One identity
```

---

## Roadmap

### v0.0.x — Foundation ✅
- [x] Solid pod (LDP, WAC, WebID)
- [x] Nostr relay (NIP-01, NIP-11)
- [x] Git HTTP backend
- [x] DID resolution (did:nostr)
- [x] Android/Termux support

### v0.1.x — Federation
- [ ] ActivityPub integration
- [ ] Mastodon compatibility
- [ ] WebID = AP Actor = Nostr pubkey

### v0.2.x — Mobile
- [ ] One-tap install app
- [ ] Built-in relay service
- [ ] P2P mode (no VPS)

### v1.0 — Production
- [ ] Clustering
- [ ] Admin dashboard
- [ ] Plugin system

---

## Configuration

```bash
# CLI
sandymount start --port 3000 --nostr --git

# Environment
export SAND_PORT=3000
export SAND_NOSTR=true
export SAND_GIT=true
```

---

## Resources

| Resource | Link |
|----------|------|
| Website | [sandy-mount.com](https://sandy-mount.com) |
| GitHub | [sandy-mount/sandymount](https://github.com/sandy-mount/sandymount) |
| npm | [npmjs.com/package/sandymount](https://www.npmjs.com/package/sandymount) |
| Solid | [solidproject.org](https://solidproject.org) |
| Nostr | [nostr.com](https://nostr.com) |
| ActivityPub | [activitypub.rocks](https://activitypub.rocks) |

---

## Contributing

We welcome contributions in:
- ActivityPub integration
- Mobile app development
- P2P connectivity
- Documentation

See [Issue #3](https://github.com/sandy-mount/sandymount/issues/3) for the SAND Stack roadmap.

---

## License

**AGPL-3.0** — Free as in freedom.

---

<div align="center">

**Sandymount** — *Because your data should be yours.*

🏖️

[sandy-mount.com](https://sandy-mount.com)

</div>
