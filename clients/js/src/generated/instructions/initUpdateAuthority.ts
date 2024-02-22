/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

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
  ReadonlySignerAccount,
  WritableAccount,
  WritableSignerAccount,
} from '@solana/instructions';
import {
  Option,
  OptionOrNullable,
  getOptionDecoder,
  getOptionEncoder,
} from '@solana/options';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import { findAuthorityPda } from '../pdas';
import {
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

export type InitUpdateAuthorityInstruction<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountWhitelistAuthority extends string | IAccountMeta<string> = string,
  TAccountCosigner extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelistAuthority extends string
        ? WritableAccount<TAccountWhitelistAuthority>
        : TAccountWhitelistAuthority,
      TAccountCosigner extends string
        ? WritableSignerAccount<TAccountCosigner>
        : TAccountCosigner,
      TAccountOwner extends string
        ? ReadonlySignerAccount<TAccountOwner>
        : TAccountOwner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type InitUpdateAuthorityInstructionWithSigners<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountWhitelistAuthority extends string | IAccountMeta<string> = string,
  TAccountCosigner extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountWhitelistAuthority extends string
        ? WritableAccount<TAccountWhitelistAuthority>
        : TAccountWhitelistAuthority,
      TAccountCosigner extends string
        ? WritableSignerAccount<TAccountCosigner> &
            IAccountSignerMeta<TAccountCosigner>
        : TAccountCosigner,
      TAccountOwner extends string
        ? ReadonlySignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type InitUpdateAuthorityInstructionData = {
  discriminator: Array<number>;
  newCosigner: Option<Address>;
  newOwner: Option<Address>;
};

export type InitUpdateAuthorityInstructionDataArgs = {
  newCosigner: OptionOrNullable<Address>;
  newOwner: OptionOrNullable<Address>;
};

export function getInitUpdateAuthorityInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{
      discriminator: Array<number>;
      newCosigner: OptionOrNullable<Address>;
      newOwner: OptionOrNullable<Address>;
    }>([
      ['discriminator', getArrayEncoder(getU8Encoder(), { size: 8 })],
      ['newCosigner', getOptionEncoder(getAddressEncoder())],
      ['newOwner', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: [53, 144, 79, 150, 196, 110, 22, 55],
    })
  ) satisfies Encoder<InitUpdateAuthorityInstructionDataArgs>;
}

export function getInitUpdateAuthorityInstructionDataDecoder() {
  return getStructDecoder<InitUpdateAuthorityInstructionData>([
    ['discriminator', getArrayDecoder(getU8Decoder(), { size: 8 })],
    ['newCosigner', getOptionDecoder(getAddressDecoder())],
    ['newOwner', getOptionDecoder(getAddressDecoder())],
  ]) satisfies Decoder<InitUpdateAuthorityInstructionData>;
}

export function getInitUpdateAuthorityInstructionDataCodec(): Codec<
  InitUpdateAuthorityInstructionDataArgs,
  InitUpdateAuthorityInstructionData
> {
  return combineCodec(
    getInitUpdateAuthorityInstructionDataEncoder(),
    getInitUpdateAuthorityInstructionDataDecoder()
  );
}

export type InitUpdateAuthorityAsyncInput<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string
> = {
  whitelistAuthority?: Address<TAccountWhitelistAuthority>;
  /** both have to sign on any updates */
  cosigner: Address<TAccountCosigner>;
  owner: Address<TAccountOwner>;
  systemProgram?: Address<TAccountSystemProgram>;
  newCosigner: InitUpdateAuthorityInstructionDataArgs['newCosigner'];
  newOwner: InitUpdateAuthorityInstructionDataArgs['newOwner'];
};

export type InitUpdateAuthorityAsyncInputWithSigners<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string
> = {
  whitelistAuthority?: Address<TAccountWhitelistAuthority>;
  /** both have to sign on any updates */
  cosigner: TransactionSigner<TAccountCosigner>;
  owner: TransactionSigner<TAccountOwner>;
  systemProgram?: Address<TAccountSystemProgram>;
  newCosigner: InitUpdateAuthorityInstructionDataArgs['newCosigner'];
  newOwner: InitUpdateAuthorityInstructionDataArgs['newOwner'];
};

export async function getInitUpdateAuthorityInstructionAsync<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: InitUpdateAuthorityAsyncInputWithSigners<
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
): Promise<
  InitUpdateAuthorityInstructionWithSigners<
    TProgram,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
>;
export async function getInitUpdateAuthorityInstructionAsync<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: InitUpdateAuthorityAsyncInput<
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
): Promise<
  InitUpdateAuthorityInstruction<
    TProgram,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
>;
export async function getInitUpdateAuthorityInstructionAsync<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: InitUpdateAuthorityAsyncInput<
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
): Promise<IInstruction> {
  // Program address.
  const programAddress =
    'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getInitUpdateAuthorityInstructionRaw<
      TProgram,
      TAccountWhitelistAuthority,
      TAccountCosigner,
      TAccountOwner,
      TAccountSystemProgram
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    whitelistAuthority: {
      value: input.whitelistAuthority ?? null,
      isWritable: true,
    },
    cosigner: { value: input.cosigner ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

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

  const instruction = getInitUpdateAuthorityInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as InitUpdateAuthorityInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export type InitUpdateAuthorityInput<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string
> = {
  whitelistAuthority: Address<TAccountWhitelistAuthority>;
  /** both have to sign on any updates */
  cosigner: Address<TAccountCosigner>;
  owner: Address<TAccountOwner>;
  systemProgram?: Address<TAccountSystemProgram>;
  newCosigner: InitUpdateAuthorityInstructionDataArgs['newCosigner'];
  newOwner: InitUpdateAuthorityInstructionDataArgs['newOwner'];
};

export type InitUpdateAuthorityInputWithSigners<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string
> = {
  whitelistAuthority: Address<TAccountWhitelistAuthority>;
  /** both have to sign on any updates */
  cosigner: TransactionSigner<TAccountCosigner>;
  owner: TransactionSigner<TAccountOwner>;
  systemProgram?: Address<TAccountSystemProgram>;
  newCosigner: InitUpdateAuthorityInstructionDataArgs['newCosigner'];
  newOwner: InitUpdateAuthorityInstructionDataArgs['newOwner'];
};

export function getInitUpdateAuthorityInstruction<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: InitUpdateAuthorityInputWithSigners<
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
): InitUpdateAuthorityInstructionWithSigners<
  TProgram,
  TAccountWhitelistAuthority,
  TAccountCosigner,
  TAccountOwner,
  TAccountSystemProgram
>;
export function getInitUpdateAuthorityInstruction<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: InitUpdateAuthorityInput<
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
): InitUpdateAuthorityInstruction<
  TProgram,
  TAccountWhitelistAuthority,
  TAccountCosigner,
  TAccountOwner,
  TAccountSystemProgram
>;
export function getInitUpdateAuthorityInstruction<
  TAccountWhitelistAuthority extends string,
  TAccountCosigner extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: InitUpdateAuthorityInput<
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram
  >
): IInstruction {
  // Program address.
  const programAddress =
    'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getInitUpdateAuthorityInstructionRaw<
      TProgram,
      TAccountWhitelistAuthority,
      TAccountCosigner,
      TAccountOwner,
      TAccountSystemProgram
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    whitelistAuthority: {
      value: input.whitelistAuthority ?? null,
      isWritable: true,
    },
    cosigner: { value: input.cosigner ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

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

  const instruction = getInitUpdateAuthorityInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as InitUpdateAuthorityInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getInitUpdateAuthorityInstructionRaw<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountWhitelistAuthority extends string | IAccountMeta<string> = string,
  TAccountCosigner extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    whitelistAuthority: TAccountWhitelistAuthority extends string
      ? Address<TAccountWhitelistAuthority>
      : TAccountWhitelistAuthority;
    cosigner: TAccountCosigner extends string
      ? Address<TAccountCosigner>
      : TAccountCosigner;
    owner: TAccountOwner extends string
      ? Address<TAccountOwner>
      : TAccountOwner;
    systemProgram?: TAccountSystemProgram extends string
      ? Address<TAccountSystemProgram>
      : TAccountSystemProgram;
  },
  args: InitUpdateAuthorityInstructionDataArgs,
  programAddress: Address<TProgram> = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.whitelistAuthority, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.cosigner, AccountRole.WRITABLE_SIGNER),
      accountMetaWithDefault(accounts.owner, AccountRole.READONLY_SIGNER),
      accountMetaWithDefault(
        accounts.systemProgram ??
          ('11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>),
        AccountRole.READONLY
      ),
      ...(remainingAccounts ?? []),
    ],
    data: getInitUpdateAuthorityInstructionDataEncoder().encode(args),
    programAddress,
  } as InitUpdateAuthorityInstruction<
    TProgram,
    TAccountWhitelistAuthority,
    TAccountCosigner,
    TAccountOwner,
    TAccountSystemProgram,
    TRemainingAccounts
  >;
}

export type ParsedInitUpdateAuthorityInstruction<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    whitelistAuthority: TAccountMetas[0];
    /** both have to sign on any updates */
    cosigner: TAccountMetas[1];
    owner: TAccountMetas[2];
    systemProgram: TAccountMetas[3];
  };
  data: InitUpdateAuthorityInstructionData;
};

export function parseInitUpdateAuthorityInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitUpdateAuthorityInstruction<TProgram, TAccountMetas> {
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
      whitelistAuthority: getNextAccount(),
      cosigner: getNextAccount(),
      owner: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitUpdateAuthorityInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
