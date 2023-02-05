#!/bin/bash
set -e

#moving everything into here so that tests dont run if build crashes
rm -rf .anchor
anchor build -- --features testing
bash scripts/cp_idl.sh

# Build token metadata program for testing
git submodule init
git submodule update

pushd deps/metaplex-mpl/token-metadata/program
cargo build-bpf
popd
pushd deps/metaplex-auth/program
cargo build-bpf
popd

# Run tests
anchor test --skip-build -- --features testing
