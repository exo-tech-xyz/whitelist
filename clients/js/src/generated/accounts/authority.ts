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
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import { getU8Decoder, getU8Encoder } from '@solana/codecs-numbers';
import { findAuthorityPda } from '../pdas';

export type Authority<TAddress extends string = string> = Account<
  AuthorityAccountData,
  TAddress
>;

export type MaybeAuthority<TAddress extends string = string> = MaybeAccount<
  AuthorityAccountData,
  TAddress
>;

export type AuthorityAccountData = {
  discriminator: Array<number>;
  bump: number;
  /** cosigner of the whitelist - has rights to update it if unfrozen */
  cosigner: Address;
  /**
   * owner of the whitelist (stricter, should be handled more carefully)
   * has rights to 1)freeze, 2)unfreeze, 3)update frozen whitelists
   */
  owner: Address;
  reserved: Uint8Array;
};

export type AuthorityAccountDataArgs = {
  bump: number;
  /** cosigner of the whitelist - has rights to update it if unfrozen */
  cosigner: Address;
  /**
   * owner of the whitelist (stricter, should be handled more carefully)
   * has rights to 1)freeze, 2)unfreeze, 3)update frozen whitelists
   */
  owner: Address;
  reserved: Uint8Array;
};

export function getAuthorityAccountDataEncoder() {
  return mapEncoder(
    getStructEncoder<{
      discriminator: Array<number>;
      bump: number;
      /** cosigner of the whitelist - has rights to update it if unfrozen */
      cosigner: Address;
      /**
       * owner of the whitelist (stricter, should be handled more carefully)
       * has rights to 1)freeze, 2)unfreeze, 3)update frozen whitelists
       */
      owner: Address;
      reserved: Uint8Array;
    }>([
      ['discriminator', getArrayEncoder(getU8Encoder(), { size: 8 })],
      ['bump', getU8Encoder()],
      ['cosigner', getAddressEncoder()],
      ['owner', getAddressEncoder()],
      ['reserved', getBytesEncoder({ size: 64 })],
    ]),
    (value) => ({
      ...value,
      discriminator: [36, 108, 254, 18, 167, 144, 27, 36],
    })
  ) satisfies Encoder<AuthorityAccountDataArgs>;
}

export function getAuthorityAccountDataDecoder() {
  return getStructDecoder<AuthorityAccountData>([
    ['discriminator', getArrayDecoder(getU8Decoder(), { size: 8 })],
    ['bump', getU8Decoder()],
    ['cosigner', getAddressDecoder()],
    ['owner', getAddressDecoder()],
    ['reserved', getBytesDecoder({ size: 64 })],
  ]) satisfies Decoder<AuthorityAccountData>;
}

export function getAuthorityAccountDataCodec(): Codec<
  AuthorityAccountDataArgs,
  AuthorityAccountData
> {
  return combineCodec(
    getAuthorityAccountDataEncoder(),
    getAuthorityAccountDataDecoder()
  );
}

export function decodeAuthority<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Authority<TAddress>;
export function decodeAuthority<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAuthority<TAddress>;
export function decodeAuthority<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Authority<TAddress> | MaybeAuthority<TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getAuthorityAccountDataDecoder()
  );
}

export async function fetchAuthority<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Authority<TAddress>> {
  const maybeAccount = await fetchMaybeAuthority(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeAuthority<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAuthority<TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeAuthority(maybeAccount);
}

export async function fetchAllAuthority(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Authority[]> {
  const maybeAccounts = await fetchAllMaybeAuthority(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeAuthority(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAuthority[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeAuthority(maybeAccount));
}

export function getAuthoritySize(): number {
  return 137;
}

export async function fetchAuthorityFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Authority> {
  const maybeAccount = await fetchMaybeAuthorityFromSeeds(rpc, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeAuthorityFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeAuthority> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findAuthorityPda({ programAddress });
  return fetchMaybeAuthority(rpc, address, fetchConfig);
}