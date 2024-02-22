/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  EncodedAccount,
  FetchAccountConfig,
  FetchAccountsConfig,
  MaybeAccount,
  MaybeEncodedAccount,
  assertAccountExists,
  assertAccountsExist,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
} from '@solana/accounts';
import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  mapEncoder,
} from '@solana/codecs-core';
import {
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import { getU8Decoder, getU8Encoder } from '@solana/codecs-numbers';
import {
  Option,
  OptionOrNullable,
  getOptionDecoder,
  getOptionEncoder,
} from '@solana/options';
import { WhitelistSeeds, findWhitelistPda } from '../pdas';

export type Whitelist<TAddress extends string = string> = Account<
  WhitelistAccountData,
  TAddress
>;

export type MaybeWhitelist<TAddress extends string = string> = MaybeAccount<
  WhitelistAccountData,
  TAddress
>;

export type WhitelistAccountData = {
  discriminator: Array<number>;
  version: number;
  bump: number;
  /** DEPRECATED, doesn't do anything */
  verified: boolean;
  /** in the case when not present will be [u8; 32] */
  rootHash: Uint8Array;
  uuid: Uint8Array;
  name: Uint8Array;
  frozen: boolean;
  voc: Option<Address>;
  fvc: Option<Address>;
  reserved: Uint8Array;
};

export type WhitelistAccountDataArgs = {
  version: number;
  bump: number;
  /** DEPRECATED, doesn't do anything */
  verified: boolean;
  /** in the case when not present will be [u8; 32] */
  rootHash: Uint8Array;
  uuid: Uint8Array;
  name: Uint8Array;
  frozen: boolean;
  voc: OptionOrNullable<Address>;
  fvc: OptionOrNullable<Address>;
  reserved: Uint8Array;
};

export function getWhitelistAccountDataEncoder() {
  return mapEncoder(
    getStructEncoder<{
      discriminator: Array<number>;
      version: number;
      bump: number;
      /** DEPRECATED, doesn't do anything */
      verified: boolean;
      /** in the case when not present will be [u8; 32] */
      rootHash: Uint8Array;
      uuid: Uint8Array;
      name: Uint8Array;
      frozen: boolean;
      voc: OptionOrNullable<Address>;
      fvc: OptionOrNullable<Address>;
      reserved: Uint8Array;
    }>([
      ['discriminator', getArrayEncoder(getU8Encoder(), { size: 8 })],
      ['version', getU8Encoder()],
      ['bump', getU8Encoder()],
      ['verified', getBooleanEncoder()],
      ['rootHash', getBytesEncoder({ size: 32 })],
      ['uuid', getBytesEncoder({ size: 32 })],
      ['name', getBytesEncoder({ size: 32 })],
      ['frozen', getBooleanEncoder()],
      ['voc', getOptionEncoder(getAddressEncoder())],
      ['fvc', getOptionEncoder(getAddressEncoder())],
      ['reserved', getBytesEncoder({ size: 64 })],
    ]),
    (value) => ({
      ...value,
      discriminator: [204, 176, 52, 79, 146, 121, 54, 247],
    })
  ) satisfies Encoder<WhitelistAccountDataArgs>;
}

export function getWhitelistAccountDataDecoder() {
  return getStructDecoder<WhitelistAccountData>([
    ['discriminator', getArrayDecoder(getU8Decoder(), { size: 8 })],
    ['version', getU8Decoder()],
    ['bump', getU8Decoder()],
    ['verified', getBooleanDecoder()],
    ['rootHash', getBytesDecoder({ size: 32 })],
    ['uuid', getBytesDecoder({ size: 32 })],
    ['name', getBytesDecoder({ size: 32 })],
    ['frozen', getBooleanDecoder()],
    ['voc', getOptionDecoder(getAddressDecoder())],
    ['fvc', getOptionDecoder(getAddressDecoder())],
    ['reserved', getBytesDecoder({ size: 64 })],
  ]) satisfies Decoder<WhitelistAccountData>;
}

export function getWhitelistAccountDataCodec(): Codec<
  WhitelistAccountDataArgs,
  WhitelistAccountData
> {
  return combineCodec(
    getWhitelistAccountDataEncoder(),
    getWhitelistAccountDataDecoder()
  );
}

export function decodeWhitelist<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Whitelist<TAddress>;
export function decodeWhitelist<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeWhitelist<TAddress>;
export function decodeWhitelist<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Whitelist<TAddress> | MaybeWhitelist<TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getWhitelistAccountDataDecoder()
  );
}

export async function fetchWhitelist<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Whitelist<TAddress>> {
  const maybeAccount = await fetchMaybeWhitelist(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeWhitelist<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeWhitelist<TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeWhitelist(maybeAccount);
}

export async function fetchAllWhitelist(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Whitelist[]> {
  const maybeAccounts = await fetchAllMaybeWhitelist(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeWhitelist(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeWhitelist[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeWhitelist(maybeAccount));
}

export function getWhitelistSize(): number {
  return 238;
}

export async function fetchWhitelistFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: WhitelistSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Whitelist> {
  const maybeAccount = await fetchMaybeWhitelistFromSeeds(rpc, seeds, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeWhitelistFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: WhitelistSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeWhitelist> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findWhitelistPda(seeds, { programAddress });
  return fetchMaybeWhitelist(rpc, address, fetchConfig);
}
