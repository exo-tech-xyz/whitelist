import { PublicKey } from "@solana/web3.js";
import { TENSORSWAP_ADDR } from "./constants";
import { BN } from "@project-serum/anchor";

export const findPoolPDA = ({
  program,
  tswap,
  owner,
  whitelist,
  poolType,
  curveType,
  startingPrice,
  delta,
}: {
  program?: PublicKey;
  tswap: PublicKey;
  owner: PublicKey;
  whitelist: PublicKey;
  poolType: number;
  curveType: number;
  startingPrice: BN;
  delta: BN;
}): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      tswap.toBytes(),
      owner.toBytes(),
      whitelist.toBytes(),
      //u8s, hence 1 byte each
      new BN(poolType).toBuffer("le", 1),
      new BN(curveType).toBuffer("le", 1),
      //u64s, hence 8 bytes each
      startingPrice.toBuffer("le", 8),
      delta.toBuffer("le", 8),
    ],
    program ?? TENSORSWAP_ADDR
  );
};

export const findTSwapPDA = ({ program }: { program?: PublicKey }) => {
  return PublicKey.findProgramAddressSync([], program ?? TENSORSWAP_ADDR);
};

export const findNftEscrowPDA = ({
  program,
  nftMint,
}: {
  program?: PublicKey;
  nftMint: PublicKey;
}) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("nft_escrow"), nftMint.toBytes()],
    program ?? TENSORSWAP_ADDR
  );
};

export const findNftDepositReceiptPDA = ({
  program,
  nftMint,
}: {
  program?: PublicKey;
  nftMint: PublicKey;
}) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("nft_receipt"), nftMint.toBytes()],
    program ?? TENSORSWAP_ADDR
  );
};

export const findSolEscrowPDA = ({
  program,
  pool,
}: {
  program?: PublicKey;
  pool: PublicKey;
}) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("sol_escrow"), pool.toBytes()],
    program ?? TENSORSWAP_ADDR
  );
};
