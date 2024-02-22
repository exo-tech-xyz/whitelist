/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
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
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import { getU8Decoder, getU8Encoder } from '@solana/codecs-numbers';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  WritableAccount,
  WritableSignerAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import { findAuthorityPda } from '../pdas';
import {
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

export type FreezeWhitelistInstruction<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountWhitelistAuthority extends string | IAccountMeta<string> = string,
  TAccountCosigner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelist extends string
        ? WritableAccount<TAccountWhitelist>
        : TAccountWhitelist,
      TAccountWhitelistAuthority extends string
        ? ReadonlyAccount<TAccountWhitelistAuthority>
        : TAccountWhitelistAuthority,
      TAccountCosigner extends string
        ? WritableSignerAccount<TAccountCosigner>
        : TAccountCosigner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type FreezeWhitelistInstructionWithSigners<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountWhitelistAuthority extends string | IAccountMeta<string> = string,
  TAccountCosigner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelist extends string
        ? WritableAccount<TAccountWhitelist>
        : TAccountWhitelist,
      TAccountWhitelistAuthority extends string
        ? ReadonlyAccount<TAccountWhitelistAuthority>
        : TAccountWhitelistAuthority,
      TAccountCosigner extends string
        ? WritableSignerAccount<TAccountCosigner> &
            IAccountSignerMeta<TAccountCosigner>
        : TAccountCosigner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type FreezeWhitelistInstructionData = { discriminator: Array<number> };

export type FreezeWhitelistInstructionDataArgs = {};

export function getFreezeWhitelistInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: Array<number> }>([
      ['discriminator', getArrayEncoder(getU8Encoder(), { size: 8 })],
    ]),
    (value) => ({
      ...value,
      discriminator: [248, 112, 12, 150, 175, 238, 38, 184],
    })
  ) satisfies Encoder<FreezeWhitelistInstructionDataArgs>;
}

export function getFreezeWhitelistInstructionDataDecoder() {
  return getStructDecoder<FreezeWhitelistInstructionData>([
    ['discriminator', getArrayDecoder(getU8Decoder(), { size: 8 })],
  ]) satisfies Decoder<FreezeWhitelistInstructionData>;
}

export function getFreezeWhitelistInstructionDataCodec(): Codec<
  FreezeWhitelistInstructionDataArgs,
  FreezeWhitelistInstructionData
> {
  return combineCodec(
    getFreezeWhitelistInstructionDataEncoder(),
    getFreezeWhitelistInstructionDataDecoder()
  );
}

export type FreezeWhitelistAsyncInput<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string
> = {
  whitelist: Address<TAccountWhitelist>;
  /**
   * there can only be 1 whitelist authority (due to seeds),
   * and we're checking that 1)the correct cosigner is present on it, and 2)is a signer
   */

  whitelistAuthority?: Address<TAccountWhitelistAuthority>;
  /** freezing only requires cosigner */
  cosigner: Address<TAccountCosigner>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export type FreezeWhitelistAsyncInputWithSigners<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string
> = {
  whitelist: Address<TAccountWhitelist>;
  /**
   * there can only be 1 whitelist authority (due to seeds),
   * and we're checking that 1)the correct cosigner is present on it, and 2)is a signer
   */

  whitelistAuthority?: Address<TAccountWhitelistAuthority>;
  /** freezing only requires cosigner */
  cosigner: TransactionSigner<TAccountCosigner>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export async function getFreezeWhitelistInstructionAsync<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: FreezeWhitelistAsyncInputWithSigners<
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
): Promise<
  FreezeWhitelistInstructionWithSigners<
    TProgram,
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
>;
export async function getFreezeWhitelistInstructionAsync<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: FreezeWhitelistAsyncInput<
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
): Promise<
  FreezeWhitelistInstruction<
    TProgram,
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
>;
export async function getFreezeWhitelistInstructionAsync<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: FreezeWhitelistAsyncInput<
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
): Promise<IInstruction> {
  // Program address.
  const programAddress =
    'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getFreezeWhitelistInstructionRaw<
      TProgram,
      TAccountWhitelist,
      TAccountWhitelistAuthority,
      TAccountCosigner,
      TAccountSystemProgram
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    whitelist: { value: input.whitelist ?? null, isWritable: true },
    whitelistAuthority: {
      value: input.whitelistAuthority ?? null,
      isWritable: false,
    },
    cosigner: { value: input.cosigner ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };

  // Resolve default values.
  if (!accounts.whitelistAuthority.value) {
    accounts.whitelistAuthority.value = await findAuthorityPda();
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getFreezeWhitelistInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    programAddress
  );

  return instruction;
}

export type FreezeWhitelistInput<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string
> = {
  whitelist: Address<TAccountWhitelist>;
  /**
   * there can only be 1 whitelist authority (due to seeds),
   * and we're checking that 1)the correct cosigner is present on it, and 2)is a signer
   */

  whitelistAuthority: Address<TAccountWhitelistAuthority>;
  /** freezing only requires cosigner */
  cosigner: Address<TAccountCosigner>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export type FreezeWhitelistInputWithSigners<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string
> = {
  whitelist: Address<TAccountWhitelist>;
  /**
   * there can only be 1 whitelist authority (due to seeds),
   * and we're checking that 1)the correct cosigner is present on it, and 2)is a signer
   */

  whitelistAuthority: Address<TAccountWhitelistAuthority>;
  /** freezing only requires cosigner */
  cosigner: TransactionSigner<TAccountCosigner>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getFreezeWhitelistInstruction<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: FreezeWhitelistInputWithSigners<
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
): FreezeWhitelistInstructionWithSigners<
  TProgram,
  TAccountWhitelist,
  TAccountWhitelistAuthority,
  TAccountCosigner,
  TAccountSystemProgram
>;
export function getFreezeWhitelistInstruction<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: FreezeWhitelistInput<
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
): FreezeWhitelistInstruction<
  TProgram,
  TAccountWhitelist,
  TAccountWhitelistAuthority,
  TAccountCosigner,
  TAccountSystemProgram
>;
export function getFreezeWhitelistInstruction<
  TAccountWhitelist extends string,
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: FreezeWhitelistInput<
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram
  >
): IInstruction {
  // Program address.
  const programAddress =
    'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getFreezeWhitelistInstructionRaw<
      TProgram,
      TAccountWhitelist,
      TAccountWhitelistAuthority,
      TAccountCosigner,
      TAccountSystemProgram
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    whitelist: { value: input.whitelist ?? null, isWritable: true },
    whitelistAuthority: {
      value: input.whitelistAuthority ?? null,
      isWritable: false,
    },
    cosigner: { value: input.cosigner ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getFreezeWhitelistInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    programAddress
  );

  return instruction;
}

export function getFreezeWhitelistInstructionRaw<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountWhitelist extends string | IAccountMeta<string> = string,
  TAccountWhitelistAuthority extends string | IAccountMeta<string> = string,
  TAccountCosigner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    whitelist: TAccountWhitelist extends string
      ? Address<TAccountWhitelist>
      : TAccountWhitelist;
    whitelistAuthority: TAccountWhitelistAuthority extends string
      ? Address<TAccountWhitelistAuthority>
      : TAccountWhitelistAuthority;
    cosigner: TAccountCosigner extends string
      ? Address<TAccountCosigner>
      : TAccountCosigner;
    systemProgram?: TAccountSystemProgram extends string
      ? Address<TAccountSystemProgram>
      : TAccountSystemProgram;
  },
  programAddress: Address<TProgram> = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.whitelist, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.whitelistAuthority, AccountRole.READONLY),
      accountMetaWithDefault(accounts.cosigner, AccountRole.WRITABLE_SIGNER),
      accountMetaWithDefault(
        accounts.systemProgram ??
          ('11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>),
        AccountRole.READONLY
      ),
      ...(remainingAccounts ?? []),
    ],
    data: getFreezeWhitelistInstructionDataEncoder().encode({}),
    programAddress,
  } as FreezeWhitelistInstruction<
    TProgram,
    TAccountWhitelist,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountSystemProgram,
    TRemainingAccounts
  >;
}

export type ParsedFreezeWhitelistInstruction<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    whitelist: TAccountMetas[0];
    /**
     * there can only be 1 whitelist authority (due to seeds),
     * and we're checking that 1)the correct cosigner is present on it, and 2)is a signer
     */

    whitelistAuthority: TAccountMetas[1];
    /** freezing only requires cosigner */
    cosigner: TAccountMetas[2];
    systemProgram: TAccountMetas[3];
  };
  data: FreezeWhitelistInstructionData;
};

export function parseFreezeWhitelistInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedFreezeWhitelistInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      whitelist: getNextAccount(),
      whitelistAuthority: getNextAccount(),
      cosigner: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getFreezeWhitelistInstructionDataDecoder().decode(instruction.data),
  };
}
