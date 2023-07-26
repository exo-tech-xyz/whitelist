#!/bin/bash
set -e

#moving everything into here so that tests dont run if build crashes
rm -rf .anchor
anchor build -- --features testing
bash scripts/cp_idl.sh

# Build token metadata program for testing
git submodule init
git submodule update

# (!!) Sync deps target dirs with 'cache-cargo/action.yaml'!
pushd deps/metaplex-mpl/token-metadata/program
cargo build-bpf
popd
pushd deps/metaplex-auth/programs/token-auth-rules
cargo build-bpf
popd