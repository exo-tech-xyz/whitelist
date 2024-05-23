#!/usr/bin/env zx
import "zx/globals";
import * as k from "kinobi";
import { rootNodeFromAnchor } from "@kinobi-so/nodes-from-anchor";
import { renderVisitor as renderJavaScriptVisitor } from "@kinobi-so/renderers-js";
import { renderVisitor as renderRustVisitor } from "@kinobi-so/renderers-rust";
import { getAllProgramIdls } from "./utils.mjs";

// Instanciate Kinobi.
const [idl, ...additionalIdls] = getAllProgramIdls().map((idl) =>
  rootNodeFromAnchor(require(idl))
);
const kinobi = k.createFromRoot(idl, additionalIdls);

// Update programs.
kinobi.update(
  k.updateProgramsVisitor({
    whitelistProgram: {
      name: "tensorWhitelist",
    },
  })
);

// Update accounts.
kinobi.update(
  k.updateAccountsVisitor({
    mintProof: {
      size: 28,
      seeds: [
        k.constantPdaSeedNodeFromString("utf8", "mint_proof"),
        k.variablePdaSeedNode(
          "mint",
          k.publicKeyTypeNode(),
          "The address of the mint account"
        ),
        k.variablePdaSeedNode(
          "whitelist",
          k.publicKeyTypeNode(),
          "The address of the whitelist pda"
        ),
      ],
    },
    mintProofV2: {
      size: 945,
      seeds: [
        k.constantPdaSeedNodeFromString("utf8", "mint_proof"),
        k.variablePdaSeedNode(
          "mint",
          k.publicKeyTypeNode(),
          "The address of the mint account"
        ),
        k.variablePdaSeedNode(
          "whitelist",
          k.publicKeyTypeNode(),
          "The address of the whitelist pda"
        ),
      ],
    },
    whitelist: {
      size: 238,
      seeds: [
        k.variablePdaSeedNode(
          "uuid",
          k.fixedSizeTypeNode(k.bytesTypeNode(), 32),
          "UUID of the whitelist"
        ),
      ],
    },
    whitelistV2: {
      size: 239,
      seeds: [
        k.constantPdaSeedNodeFromString("utf8", "whitelist"),
        k.variablePdaSeedNode(
          "namespace",
          k.publicKeyTypeNode(),
          "The namespace address"
        ),
        k.variablePdaSeedNode(
          "uuid",
          k.fixedSizeTypeNode(k.bytesTypeNode(), 32),
          "UUID of the whitelist"
        ),
      ],
    },
    authority: {
      size: 137,
      seeds: [],
    },
  })
);

// Set default values for instruction accounts.
kinobi.update(
  k.setInstructionAccountDefaultValuesVisitor([
    {
      account: "mintProof",
      ignoreIfOptional: true,
      defaultValue: k.pdaValueNode("mintProof"),
    },
    {
      account: "whitelist",
      ignoreIfOptional: true,
      defaultValue: k.pdaValueNode("whitelist"),
    },
    {
      account: "whitelistAuthority",
      defaultValue: k.pdaValueNode("authority"),
    },
  ])
);

// Render JavaScript.
const jsClient = path.join(__dirname, "..", "clients", "js");
kinobi.accept(
  renderJavaScriptVisitor(path.join(jsClient, "src", "generated"), {
    prettier: require(path.join(jsClient, ".prettierrc.json")),
  })
);

// Render Rust.
const rustClient = path.join(__dirname, "..", "clients", "rust");
kinobi.accept(
  renderRustVisitor(path.join(rustClient, "src", "generated"), {
    formatCode: true,
    crateFolder: rustClient,
  })
);