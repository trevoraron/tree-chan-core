# Tree Chan

## What is It?

Tree Chan is a new social media project

Users can create posts on tree chan with custom messages.

Each post on Tree Chan is an NFT that can be traded and sold.

Each posts can have comments. Those are also NFTs. Each comment can also have
their own comments.

This forms a tree, which a front end can take advantage of.

Here is an example:

```
    1
    |
    2
    /\
   3  4
  /\
 5 6
```

Each post knows the post above it, and all the branches below

## Why Would I Use This?

Why not?

## Setup

Requirements:

- Node >= v12
- Yarn

```
$ npm i -g yarn       # Install yarn if you don't already have it
$ yarn install        # Install dependencies
$ yarn setup          # Setup Git hooks
```

## Linting and Formatting

To check code for problems:

```
$ yarn typecheck      # Type-check TypeScript code
$ yarn lint           # Check JavaScript and TypeScript code
$ yarn lint --fix     # Fix problems where possible
$ yarn solhint        # Check Solidity code
```

To auto-format code:

```
$ yarn fmt
```

## TypeScript type definition files for the contracts

To generate type definitions:

```
$ yarn compile && yarn typechain
```

## Testing

First, make sure Ganache is running.

```
$ yarn ganache
```

Run all tests:

```
$ yarn test
```

To run tests in a specific file, run:

```
$ yarn test [path/to/file]
```

To run tests and generate test coverage, run:

```
$ yarn coverage
```

## Deploy and Update Etherscan

```
yarn deploy --network ropsten
yarn hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "$URL"
---

MIT License
```
