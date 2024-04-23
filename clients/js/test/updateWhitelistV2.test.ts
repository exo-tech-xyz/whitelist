import test from 'ava';
import { appendTransactionInstruction, pipe } from '@solana/web3.js';
import { generateKeyPairSigner } from '@solana/signers';
import { none } from '@solana/options';
import {
  createDefaultTransaction,
  signAndSendTransaction,
  createDefaultSolanaClient,
  generateKeyPairSignerWithSol,
} from '@tensor-foundation/test-helpers';
import {
  Condition,
  Mode,
  WhitelistV2,
  fetchWhitelistV2,
  getUpdateWhitelistV2Instruction,
  operation,
} from '../src/index.js';
import {
  createWhitelist,
  getAccountDataLength,
  updateWhitelist,
} from './_common.js';

test('it can update a whitelist v2, reallocing to be larger', async (t) => {
  const client = createDefaultSolanaClient();
  const updateAuthority = await generateKeyPairSignerWithSol(client);
  const voc = (await generateKeyPairSigner()).address;

  // Default conditions size is one item
  const { whitelist, uuid, conditions } = await createWhitelist({
    client,
    updateAuthority,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions,
    },
  });

  const originalAccountSize = await getAccountDataLength(client, whitelist);

  // Make a larger conditions list
  const newConditions = [
    { mode: Mode.VOC, value: voc },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  const updateWhitelistIx = getUpdateWhitelistV2Instruction({
    payer: updateAuthority,
    updateAuthority,
    whitelist,
    conditions: newConditions,
    freezeAuthority: operation('Noop'),
  });

  await pipe(
    await createDefaultTransaction(client, updateAuthority),
    (tx) => appendTransactionInstruction(updateWhitelistIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions: newConditions,
    },
  });

  const newAccountSize = await getAccountDataLength(client, whitelist);

  t.true(newAccountSize > originalAccountSize);
});

test('it can update a whitelist v2 reallocing to be smaller', async (t) => {
  const client = createDefaultSolanaClient();
  const updateAuthority = await generateKeyPairSignerWithSol(client);
  const voc = (await generateKeyPairSigner()).address;

  // Start with larger conditions size
  const conditions = [
    { mode: Mode.VOC, value: voc },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  const { whitelist, uuid } = await createWhitelist({
    client,
    updateAuthority,
    conditions,
  });

  const originalAccountSize = await getAccountDataLength(client, whitelist);

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions,
    },
  });

  // Smaller conditions list
  const newConditions: Condition[] = [{ mode: Mode.VOC, value: voc }];

  const updateWhitelistIx = getUpdateWhitelistV2Instruction({
    payer: updateAuthority,
    updateAuthority,
    whitelist,
    conditions: newConditions,
    freezeAuthority: operation('Noop'),
  });

  await pipe(
    await createDefaultTransaction(client, updateAuthority),
    (tx) => appendTransactionInstruction(updateWhitelistIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  const newAccountSize = await getAccountDataLength(client, whitelist);

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions: newConditions,
    },
  });

  t.true(newAccountSize < originalAccountSize);
});

test('it cannot edit a whitelist v2 with the wrong authority', async (t) => {
  const client = createDefaultSolanaClient();
  const updateAuthority = await generateKeyPairSignerWithSol(client);
  const wrongAuthority = await generateKeyPairSignerWithSol(client);
  const voc = (await generateKeyPairSigner()).address;

  const { whitelist, uuid, conditions } = await createWhitelist({
    client,
    updateAuthority,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions,
    },
  });

  const newConditions = [
    { mode: Mode.VOC, value: voc },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  const updateWhitelistIx = getUpdateWhitelistV2Instruction({
    payer: updateAuthority,
    updateAuthority: wrongAuthority,
    whitelist,
    conditions: newConditions,
    freezeAuthority: operation('Noop'),
  });

  const promise = pipe(
    await createDefaultTransaction(client, wrongAuthority),
    (tx) => appendTransactionInstruction(updateWhitelistIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // 0x177a - Error Number: 6010. Error Message: invalid authority.'
  await t.throwsAsync(promise, { message: /0x177a/ });
});

test('it can change the update authority of a whitelist v2', async (t) => {
  const client = createDefaultSolanaClient();
  const updateAuthority = await generateKeyPairSignerWithSol(client);
  const newUpdateAuthority = await generateKeyPairSignerWithSol(client);

  const { whitelist, uuid, conditions } = await createWhitelist({
    client,
    updateAuthority,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions,
    },
  });

  const updateWhitelistIx = getUpdateWhitelistV2Instruction({
    payer: updateAuthority,
    updateAuthority,
    whitelist,
    newUpdateAuthority,
    conditions: none(),
    freezeAuthority: operation('Noop'),
  });

  await pipe(
    await createDefaultTransaction(client, updateAuthority),
    (tx) => appendTransactionInstruction(updateWhitelistIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: newUpdateAuthority.address,
      uuid,
      conditions,
    },
  });
});

test('it cannot update a whitelist v2 with more than one merkle proof', async (t) => {
  const client = createDefaultSolanaClient();
  const updateAuthority = await generateKeyPairSignerWithSol(client);
  const merkleProof1 = (await generateKeyPairSigner()).address;
  const merkleProof2 = (await generateKeyPairSigner()).address;

  const conditions = [
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  const { whitelist, uuid } = await createWhitelist({
    client,
    updateAuthority,
    conditions,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      uuid,
      conditions,
    },
  });

  const newConditions = [
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.MerkleTree, value: merkleProof2 },
  ];

  const updateWhitelistIx = getUpdateWhitelistV2Instruction({
    payer: updateAuthority,
    updateAuthority,
    whitelist,
    conditions: newConditions,
    freezeAuthority: operation('Noop'),
  });

  const promise = pipe(
    await createDefaultTransaction(client, updateAuthority),
    (tx) => appendTransactionInstruction(updateWhitelistIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // 6015 - TooManyMerkleProofs
  await t.throwsAsync(promise, { message: /0x177f/ });
});

test('it moves the merkle proof to the first index for a whitelist v2', async (t) => {
  const client = createDefaultSolanaClient();
  const updateAuthority = await generateKeyPairSignerWithSol(client);
  const merkleProof1 = (await generateKeyPairSigner()).address;

  // Create initial whitelist.
  const conditions = [
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  const { whitelist } = await createWhitelist({
    client,
    updateAuthority,
    conditions,
  });

  // Merkle is last item in the list.
  let newConditions = [
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.MerkleTree, value: merkleProof1 },
  ];

  let expectedConditions = [
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  await updateWhitelist({
    client,
    whitelist,
    updateAuthority,
    newConditions,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      conditions: expectedConditions,
    },
  });

  // Merkle is in the middle of the list.
  newConditions = [
    { mode: Mode.VOC, value: updateAuthority.address },
    { mode: Mode.VOC, value: updateAuthority.address },
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  // Rotated to the front.
  expectedConditions = [
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.VOC, value: updateAuthority.address },
    { mode: Mode.VOC, value: updateAuthority.address },
  ];

  await updateWhitelist({
    client,
    whitelist,
    updateAuthority,
    newConditions,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      conditions: expectedConditions,
    },
  });

  // Merkle is first item in the list.
  newConditions = [
    { mode: Mode.MerkleTree, value: merkleProof1 },
    { mode: Mode.VOC, value: updateAuthority.address },
    { mode: Mode.VOC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
    { mode: Mode.FVC, value: updateAuthority.address },
  ];

  await updateWhitelist({
    client,
    whitelist,
    updateAuthority,
    newConditions,
  });

  t.like(await fetchWhitelistV2(client.rpc, whitelist), <WhitelistV2>{
    address: whitelist,
    data: {
      updateAuthority: updateAuthority.address,
      // No rotation needed, should be the same.
      conditions: newConditions,
    },
  });
});
