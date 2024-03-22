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
import {
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

export type CloseMintProofV2Instruction<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountMintProof extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableAccount<TAccountPayer>
        : TAccountPayer,
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner>
        : TAccountSigner,
      TAccountMintProof extends string
        ? WritableAccount<TAccountMintProof>
        : TAccountMintProof,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type CloseMintProofV2InstructionWithSigners<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountMintProof extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableAccount<TAccountPayer>
        : TAccountPayer,
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner> &
            IAccountSignerMeta<TAccountSigner>
        : TAccountSigner,
      TAccountMintProof extends string
        ? WritableAccount<TAccountMintProof>
        : TAccountMintProof,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type CloseMintProofV2InstructionData = { discriminator: Array<number> };

export type CloseMintProofV2InstructionDataArgs = {};

export function getCloseMintProofV2InstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: Array<number> }>([
      ['discriminator', getArrayEncoder(getU8Encoder(), { size: 8 })],
    ]),
    (value) => ({
      ...value,
      discriminator: [237, 78, 8, 208, 47, 148, 145, 170],
    })
  ) satisfies Encoder<CloseMintProofV2InstructionDataArgs>;
}

export function getCloseMintProofV2InstructionDataDecoder() {
  return getStructDecoder<CloseMintProofV2InstructionData>([
    ['discriminator', getArrayDecoder(getU8Decoder(), { size: 8 })],
  ]) satisfies Decoder<CloseMintProofV2InstructionData>;
}

export function getCloseMintProofV2InstructionDataCodec(): Codec<
  CloseMintProofV2InstructionDataArgs,
  CloseMintProofV2InstructionData
> {
  return combineCodec(
    getCloseMintProofV2InstructionDataEncoder(),
    getCloseMintProofV2InstructionDataDecoder()
  );
}

export type CloseMintProofV2Input<
  TAccountPayer extends string,
  TAccountSigner extends string,
  TAccountMintProof extends string,
  TAccountSystemProgram extends string
> = {
  payer: Address<TAccountPayer>;
  signer: Address<TAccountSigner>;
  mintProof: Address<TAccountMintProof>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export type CloseMintProofV2InputWithSigners<
  TAccountPayer extends string,
  TAccountSigner extends string,
  TAccountMintProof extends string,
  TAccountSystemProgram extends string
> = {
  payer: Address<TAccountPayer>;
  signer: TransactionSigner<TAccountSigner>;
  mintProof: Address<TAccountMintProof>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getCloseMintProofV2Instruction<
  TAccountPayer extends string,
  TAccountSigner extends string,
  TAccountMintProof extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: CloseMintProofV2InputWithSigners<
    TAccountPayer,
    TAccountSigner,
    TAccountMintProof,
    TAccountSystemProgram
  >
): CloseMintProofV2InstructionWithSigners<
  TProgram,
  TAccountPayer,
  TAccountSigner,
  TAccountMintProof,
  TAccountSystemProgram
>;
export function getCloseMintProofV2Instruction<
  TAccountPayer extends string,
  TAccountSigner extends string,
  TAccountMintProof extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: CloseMintProofV2Input<
    TAccountPayer,
    TAccountSigner,
    TAccountMintProof,
    TAccountSystemProgram
  >
): CloseMintProofV2Instruction<
  TProgram,
  TAccountPayer,
  TAccountSigner,
  TAccountMintProof,
  TAccountSystemProgram
>;
export function getCloseMintProofV2Instruction<
  TAccountPayer extends string,
  TAccountSigner extends string,
  TAccountMintProof extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'
>(
  input: CloseMintProofV2Input<
    TAccountPayer,
    TAccountSigner,
    TAccountMintProof,
    TAccountSystemProgram
  >
): IInstruction {
  // Program address.
  const programAddress =
    'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getCloseMintProofV2InstructionRaw<
      TProgram,
      TAccountPayer,
      TAccountSigner,
      TAccountMintProof,
      TAccountSystemProgram
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    payer: { value: input.payer ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
    mintProof: { value: input.mintProof ?? null, isWritable: true },
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

  const instruction = getCloseMintProofV2InstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    programAddress
  );

  return instruction;
}

export function getCloseMintProofV2InstructionRaw<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSigner extends string | IAccountMeta<string> = string,
  TAccountMintProof extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    payer: TAccountPayer extends string
      ? Address<TAccountPayer>
      : TAccountPayer;
    signer: TAccountSigner extends string
      ? Address<TAccountSigner>
      : TAccountSigner;
    mintProof: TAccountMintProof extends string
      ? Address<TAccountMintProof>
      : TAccountMintProof;
    systemProgram?: TAccountSystemProgram extends string
      ? Address<TAccountSystemProgram>
      : TAccountSystemProgram;
  },
  programAddress: Address<TProgram> = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.payer, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.signer, AccountRole.WRITABLE_SIGNER),
      accountMetaWithDefault(accounts.mintProof, AccountRole.WRITABLE),
      accountMetaWithDefault(
        accounts.systemProgram ??
          ('11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>),
        AccountRole.READONLY
      ),
      ...(remainingAccounts ?? []),
    ],
    data: getCloseMintProofV2InstructionDataEncoder().encode({}),
    programAddress,
  } as CloseMintProofV2Instruction<
    TProgram,
    TAccountPayer,
    TAccountSigner,
    TAccountMintProof,
    TAccountSystemProgram,
    TRemainingAccounts
  >;
}

export type ParsedCloseMintProofV2Instruction<
  TProgram extends string = 'TL1ST2iRBzuGTqLn1KXnGdSnEow62BzPnGiqyRXhWtW',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    signer: TAccountMetas[1];
    mintProof: TAccountMetas[2];
    systemProgram: TAccountMetas[3];
  };
  data: CloseMintProofV2InstructionData;
};

export function parseCloseMintProofV2Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCloseMintProofV2Instruction<TProgram, TAccountMetas> {
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
      payer: getNextAccount(),
      signer: getNextAccount(),
      mintProof: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getCloseMintProofV2InstructionDataDecoder().decode(instruction.data),
  };
}