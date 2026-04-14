// biome-ignore-all lint/suspicious/noApproximativeNumericConstant: stablecoin peg prices are intentionally near $1.0000
import type { Frame, StablecoinSnapshot } from "./stablecoin-table";

// -----------------------------------------------------------------------------
// Base snapshots (frame 0 values). Subsequent frames spread from these and
// override only the fields that drift. pegDeviationBps is always kept in
// lockstep with priceUsd: pegDeviationBps = Math.round((priceUsd - 1) * 10_000).
// -----------------------------------------------------------------------------

const USDT_0: StablecoinSnapshot = {
  symbol: "USDT",
  issuer: "Tether",
  backingType: "fiat",
  priceUsd: 1.0002,
  pegDeviationBps: 2,
  volume24hUsd: 42_104_000_000,
  marketCapUsd: 118_420_000_000,
  netFlow1hUsd: 12_400_000,
  reserveRatioPct: 100.4,
  attestationAgeDays: 21,
  depth2pctUsd: 184_000_000,
};

const USDC_0: StablecoinSnapshot = {
  symbol: "USDC",
  issuer: "Circle",
  backingType: "fiat",
  priceUsd: 1.0,
  pegDeviationBps: 0,
  volume24hUsd: 8_052_000_000,
  marketCapUsd: 42_180_000_000,
  netFlow1hUsd: 4_100_000,
  reserveRatioPct: 100.1,
  attestationAgeDays: 12,
  depth2pctUsd: 96_500_000,
};

const DAI_0: StablecoinSnapshot = {
  symbol: "DAI",
  issuer: "MakerDAO",
  backingType: "crypto",
  priceUsd: 0.9999,
  pegDeviationBps: -1,
  volume24hUsd: 248_200_000,
  marketCapUsd: 5_312_000_000,
  netFlow1hUsd: -820_000,
  reserveRatioPct: 164.8,
  attestationAgeDays: null,
  depth2pctUsd: 28_400_000,
};

const USDE_0: StablecoinSnapshot = {
  symbol: "USDe",
  issuer: "Ethena",
  backingType: "yield",
  priceUsd: 1.0005,
  pegDeviationBps: 5,
  volume24hUsd: 412_800_000,
  marketCapUsd: 6_018_000_000,
  netFlow1hUsd: 2_800_000,
  reserveRatioPct: 101.2,
  attestationAgeDays: 3,
  depth2pctUsd: 14_200_000,
};

const PYUSD_0: StablecoinSnapshot = {
  symbol: "PYUSD",
  issuer: "PayPal",
  backingType: "fiat",
  priceUsd: 1.0001,
  pegDeviationBps: 1,
  volume24hUsd: 81_400_000,
  marketCapUsd: 902_300_000,
  netFlow1hUsd: 310_000,
  reserveRatioPct: 100.2,
  attestationAgeDays: 8,
  depth2pctUsd: 9_800_000,
};

const FDUSD_0: StablecoinSnapshot = {
  symbol: "FDUSD",
  issuer: "First Digital",
  backingType: "fiat",
  priceUsd: 0.9997,
  pegDeviationBps: -3,
  volume24hUsd: 3_984_000_000,
  marketCapUsd: 2_108_000_000,
  netFlow1hUsd: -1_420_000,
  reserveRatioPct: 100.1,
  attestationAgeDays: 16,
  depth2pctUsd: 18_600_000,
};

const TUSD_0: StablecoinSnapshot = {
  symbol: "TUSD",
  issuer: "TrueUSD",
  backingType: "fiat",
  priceUsd: 0.9996,
  pegDeviationBps: -4,
  volume24hUsd: 61_200_000,
  marketCapUsd: 498_400_000,
  netFlow1hUsd: -240_000,
  reserveRatioPct: 99.8,
  attestationAgeDays: 42,
  depth2pctUsd: 4_200_000,
};

const SDAI_0: StablecoinSnapshot = {
  symbol: "sDAI",
  issuer: "Spark",
  backingType: "yield",
  priceUsd: 1.0003,
  pegDeviationBps: 3,
  volume24hUsd: 21_400_000,
  marketCapUsd: 1_824_000_000,
  netFlow1hUsd: 180_000,
  reserveRatioPct: null,
  attestationAgeDays: null,
  depth2pctUsd: 6_800_000,
};

const CRVUSD_0: StablecoinSnapshot = {
  symbol: "crvUSD",
  issuer: "Curve",
  backingType: "cdp",
  priceUsd: 0.9998,
  pegDeviationBps: -2,
  volume24hUsd: 15_200_000,
  marketCapUsd: 91_300_000,
  netFlow1hUsd: -60_000,
  reserveRatioPct: null,
  attestationAgeDays: null,
  depth2pctUsd: 3_100_000,
};

const USDY_0: StablecoinSnapshot = {
  symbol: "USDY",
  issuer: "Ondo",
  backingType: "yield",
  priceUsd: 1.0008,
  pegDeviationBps: 8,
  volume24hUsd: 8_120_000,
  marketCapUsd: 622_400_000,
  netFlow1hUsd: 95_000,
  reserveRatioPct: 100.6,
  attestationAgeDays: 5,
  depth2pctUsd: 2_600_000,
};

const GHO_0: StablecoinSnapshot = {
  symbol: "GHO",
  issuer: "Aave",
  backingType: "cdp",
  priceUsd: 0.9973,
  pegDeviationBps: -27,
  volume24hUsd: 12_400_000,
  marketCapUsd: 311_800_000,
  netFlow1hUsd: -180_000,
  reserveRatioPct: null,
  attestationAgeDays: null,
  depth2pctUsd: 2_100_000,
};

const USDD_0: StablecoinSnapshot = {
  symbol: "USDD",
  issuer: "Tron DAO",
  backingType: "cdp",
  priceUsd: 0.9965,
  pegDeviationBps: -35,
  volume24hUsd: 24_820_000,
  marketCapUsd: 748_200_000,
  netFlow1hUsd: -420_000,
  reserveRatioPct: 128.4,
  attestationAgeDays: 64,
  depth2pctUsd: 1_840_000,
};

// --- frame 00: quiet baseline ---
const f00: Frame = {
  rows: [
    USDT_0,
    USDC_0,
    DAI_0,
    USDE_0,
    PYUSD_0,
    FDUSD_0,
    TUSD_0,
    SDAI_0,
    CRVUSD_0,
    USDY_0,
    GHO_0,
    USDD_0,
  ],
};

// --- frame 01: quiet jitter ---
const f01: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 42_118_000_000,
      netFlow1hUsd: 10_800_000,
      depth2pctUsd: 184_600_000,
    },
    { ...USDC_0, netFlow1hUsd: 4_600_000, volume24hUsd: 8_058_000_000 },
    { ...DAI_0, netFlow1hUsd: -640_000 },
    {
      ...USDE_0,
      priceUsd: 1.0006,
      pegDeviationBps: 6,
      volume24hUsd: 413_400_000,
    },
    PYUSD_0,
    {
      ...FDUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      depth2pctUsd: 18_720_000,
    },
    TUSD_0,
    { ...SDAI_0, netFlow1hUsd: 220_000 },
    CRVUSD_0,
    { ...USDY_0, netFlow1hUsd: 110_000 },
    { ...GHO_0, priceUsd: 0.9974, pegDeviationBps: -26 },
    {
      ...USDD_0,
      priceUsd: 0.9966,
      pegDeviationBps: -34,
      depth2pctUsd: 1_852_000,
    },
  ],
};

// --- frame 02: quiet jitter ---
const f02: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 42_132_000_000,
      netFlow1hUsd: 13_900_000,
      depth2pctUsd: 183_200_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      netFlow1hUsd: 5_100_000,
    },
    { ...DAI_0, priceUsd: 1.0, pegDeviationBps: 0, volume24hUsd: 248_600_000 },
    {
      ...USDE_0,
      priceUsd: 1.0004,
      pegDeviationBps: 4,
      netFlow1hUsd: 2_400_000,
    },
    { ...PYUSD_0, netFlow1hUsd: 340_000 },
    { ...FDUSD_0, volume24hUsd: 3_976_000_000, netFlow1hUsd: -1_280_000 },
    { ...TUSD_0, priceUsd: 0.9995, pegDeviationBps: -5 },
    SDAI_0,
    { ...CRVUSD_0, depth2pctUsd: 3_080_000 },
    USDY_0,
    { ...GHO_0, netFlow1hUsd: -150_000 },
    {
      ...USDD_0,
      priceUsd: 0.9964,
      pegDeviationBps: -36,
      netFlow1hUsd: -440_000,
    },
  ],
};

// --- frame 03: quiet jitter ---
const f03: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0003,
      pegDeviationBps: 3,
      volume24hUsd: 42_145_000_000,
      netFlow1hUsd: 14_600_000,
      marketCapUsd: 118_428_000_000,
    },
    { ...USDC_0, volume24hUsd: 8_061_000_000, depth2pctUsd: 96_700_000 },
    { ...DAI_0, priceUsd: 0.9999, pegDeviationBps: -1, netFlow1hUsd: -780_000 },
    {
      ...USDE_0,
      priceUsd: 1.0005,
      pegDeviationBps: 5,
      depth2pctUsd: 14_280_000,
    },
    { ...PYUSD_0, priceUsd: 1.0002, pegDeviationBps: 2 },
    { ...FDUSD_0, priceUsd: 0.9996, pegDeviationBps: -4 },
    { ...TUSD_0, netFlow1hUsd: -180_000 },
    { ...SDAI_0, volume24hUsd: 21_460_000 },
    CRVUSD_0,
    { ...USDY_0, depth2pctUsd: 2_620_000 },
    {
      ...GHO_0,
      priceUsd: 0.9972,
      pegDeviationBps: -28,
      depth2pctUsd: 2_080_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9965,
      pegDeviationBps: -35,
      netFlow1hUsd: -390_000,
    },
  ],
};

// --- frame 04: quiet jitter (end of quiet block) ---
const f04: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 42_158_000_000,
      netFlow1hUsd: 11_200_000,
      depth2pctUsd: 184_200_000,
    },
    { ...USDC_0, netFlow1hUsd: 4_400_000, marketCapUsd: 42_182_000_000 },
    { ...DAI_0, volume24hUsd: 248_400_000, netFlow1hUsd: -720_000 },
    { ...USDE_0, volume24hUsd: 413_900_000, netFlow1hUsd: 3_100_000 },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 280_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 3_988_000_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9996,
      pegDeviationBps: -4,
      depth2pctUsd: 4_180_000,
    },
    { ...SDAI_0, netFlow1hUsd: 210_000 },
    { ...CRVUSD_0, volume24hUsd: 15_240_000 },
    { ...USDY_0, priceUsd: 1.0007, pegDeviationBps: 7 },
    {
      ...GHO_0,
      priceUsd: 0.9973,
      pegDeviationBps: -27,
      netFlow1hUsd: -170_000,
    },
    { ...USDD_0, depth2pctUsd: 1_828_000 },
  ],
};

// --- frame 05: USDT redemption pressure begins ---
const f05: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9999,
      pegDeviationBps: -1,
      volume24hUsd: 42_340_000_000,
      netFlow1hUsd: -18_500_000,
      depth2pctUsd: 181_000_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 8_090_000_000,
      netFlow1hUsd: 7_200_000,
    },
    { ...DAI_0, priceUsd: 1.0, pegDeviationBps: 0, volume24hUsd: 249_100_000 },
    { ...USDE_0, priceUsd: 1.0004, pegDeviationBps: 4 },
    { ...PYUSD_0, priceUsd: 1.0002, pegDeviationBps: 2 },
    {
      ...FDUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      volume24hUsd: 4_008_000_000,
    },
    { ...TUSD_0, netFlow1hUsd: -310_000 },
    SDAI_0,
    { ...CRVUSD_0, priceUsd: 0.9997, pegDeviationBps: -3 },
    USDY_0,
    { ...GHO_0, priceUsd: 0.9973, pegDeviationBps: -27 },
    { ...USDD_0, priceUsd: 0.9964, pegDeviationBps: -36 },
  ],
};

// --- frame 06: USDT redemption deepens ---
const f06: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 42_520_000_000,
      netFlow1hUsd: -42_800_000,
      depth2pctUsd: 178_400_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 8_124_000_000,
      netFlow1hUsd: 11_800_000,
      depth2pctUsd: 97_100_000,
    },
    { ...DAI_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 320_000 },
    {
      ...USDE_0,
      priceUsd: 1.0003,
      pegDeviationBps: 3,
      netFlow1hUsd: 1_400_000,
    },
    { ...PYUSD_0, priceUsd: 1.0002, pegDeviationBps: 2, netFlow1hUsd: 520_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9999,
      pegDeviationBps: -1,
      volume24hUsd: 4_026_000_000,
      netFlow1hUsd: 1_800_000,
    },
    { ...TUSD_0, priceUsd: 0.9996, pegDeviationBps: -4 },
    { ...SDAI_0, netFlow1hUsd: 260_000 },
    { ...CRVUSD_0, priceUsd: 0.9997, pegDeviationBps: -3 },
    USDY_0,
    { ...GHO_0, priceUsd: 0.9972, pegDeviationBps: -28 },
    {
      ...USDD_0,
      priceUsd: 0.9963,
      pegDeviationBps: -37,
      depth2pctUsd: 1_810_000,
    },
  ],
};

// --- frame 07: USDT stress peak approaching ---
const f07: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9995,
      pegDeviationBps: -5,
      volume24hUsd: 42_710_000_000,
      netFlow1hUsd: -68_400_000,
      depth2pctUsd: 175_200_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 8_162_000_000,
      netFlow1hUsd: 14_200_000,
      depth2pctUsd: 97_400_000,
    },
    {
      ...DAI_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 250_400_000,
      netFlow1hUsd: 640_000,
    },
    {
      ...USDE_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 415_200_000,
      netFlow1hUsd: -420_000,
    },
    { ...PYUSD_0, priceUsd: 1.0003, pegDeviationBps: 3, netFlow1hUsd: 780_000 },
    {
      ...FDUSD_0,
      priceUsd: 1.0,
      pegDeviationBps: 0,
      volume24hUsd: 4_048_000_000,
      netFlow1hUsd: 3_200_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9995,
      pegDeviationBps: -5,
      netFlow1hUsd: -360_000,
    },
    { ...SDAI_0, priceUsd: 1.0004, pegDeviationBps: 4 },
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    { ...GHO_0, priceUsd: 0.9972, pegDeviationBps: -28 },
    { ...USDD_0, priceUsd: 0.9962, pegDeviationBps: -38 },
  ],
};

// --- frame 08: USDT trough (bottom of redemption leg) ---
const f08: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9994,
      pegDeviationBps: -6,
      volume24hUsd: 42_880_000_000,
      netFlow1hUsd: -85_200_000,
      depth2pctUsd: 172_800_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 8_198_000_000,
      netFlow1hUsd: 16_400_000,
      depth2pctUsd: 97_600_000,
    },
    {
      ...DAI_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 250_900_000,
      netFlow1hUsd: 920_000,
    },
    { ...USDE_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: -980_000 },
    { ...PYUSD_0, priceUsd: 1.0003, pegDeviationBps: 3, netFlow1hUsd: 910_000 },
    {
      ...FDUSD_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 4_062_000_000,
      netFlow1hUsd: 4_100_000,
      depth2pctUsd: 18_840_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9994,
      pegDeviationBps: -6,
      netFlow1hUsd: -420_000,
    },
    { ...SDAI_0, priceUsd: 1.0004, pegDeviationBps: 4, netFlow1hUsd: 320_000 },
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    {
      ...GHO_0,
      priceUsd: 0.9971,
      pegDeviationBps: -29,
      netFlow1hUsd: -220_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9962,
      pegDeviationBps: -38,
      depth2pctUsd: 1_798_000,
    },
  ],
};

// --- frame 09: USDD crack begins ---
const f09: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9995,
      pegDeviationBps: -5,
      volume24hUsd: 42_910_000_000,
      netFlow1hUsd: -72_800_000,
      depth2pctUsd: 173_600_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 8_212_000_000,
      netFlow1hUsd: 14_900_000,
    },
    { ...DAI_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 480_000 },
    { ...USDE_0, priceUsd: 1.0002, pegDeviationBps: 2 },
    { ...PYUSD_0, priceUsd: 1.0002, pegDeviationBps: 2 },
    {
      ...FDUSD_0,
      priceUsd: 1.0,
      pegDeviationBps: 0,
      volume24hUsd: 4_070_000_000,
    },
    { ...TUSD_0, priceUsd: 0.9995, pegDeviationBps: -5 },
    SDAI_0,
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    USDY_0,
    { ...GHO_0, priceUsd: 0.9972, pegDeviationBps: -28 },
    {
      ...USDD_0,
      priceUsd: 0.9948,
      pegDeviationBps: -52,
      volume24hUsd: 26_140_000,
      netFlow1hUsd: -1_420_000,
      depth2pctUsd: 1_520_000,
      reserveRatioPct: 126.8,
    },
  ],
};

// --- frame 10: USDD mid-crack ---
const f10: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9995,
      pegDeviationBps: -5,
      volume24hUsd: 42_940_000_000,
      netFlow1hUsd: -61_200_000,
      depth2pctUsd: 174_200_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 8_226_000_000,
      netFlow1hUsd: 13_100_000,
    },
    {
      ...DAI_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 251_400_000,
    },
    { ...USDE_0, priceUsd: 1.0002, pegDeviationBps: 2, netFlow1hUsd: -640_000 },
    { ...PYUSD_0, priceUsd: 1.0002, pegDeviationBps: 2 },
    { ...FDUSD_0, priceUsd: 1.0, pegDeviationBps: 0, netFlow1hUsd: 2_800_000 },
    {
      ...TUSD_0,
      priceUsd: 0.9994,
      pegDeviationBps: -6,
      depth2pctUsd: 4_120_000,
    },
    { ...SDAI_0, priceUsd: 1.0003, pegDeviationBps: 3 },
    { ...CRVUSD_0, priceUsd: 0.9997, pegDeviationBps: -3 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    { ...GHO_0, priceUsd: 0.9971, pegDeviationBps: -29 },
    {
      ...USDD_0,
      priceUsd: 0.9932,
      pegDeviationBps: -68,
      volume24hUsd: 27_820_000,
      netFlow1hUsd: -2_180_000,
      depth2pctUsd: 1_240_000,
      reserveRatioPct: 124.2,
      attestationAgeDays: 65,
    },
  ],
};

// --- frame 11: USDD crack trough ---
const f11: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9996,
      pegDeviationBps: -4,
      volume24hUsd: 42_960_000_000,
      netFlow1hUsd: -54_800_000,
      depth2pctUsd: 174_800_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 8_234_000_000,
      netFlow1hUsd: 12_400_000,
    },
    { ...DAI_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 620_000 },
    {
      ...USDE_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 416_100_000,
    },
    { ...PYUSD_0, priceUsd: 1.0002, pegDeviationBps: 2 },
    { ...FDUSD_0, priceUsd: 0.9999, pegDeviationBps: -1 },
    { ...TUSD_0, priceUsd: 0.9994, pegDeviationBps: -6 },
    { ...SDAI_0, volume24hUsd: 21_520_000 },
    {
      ...CRVUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      depth2pctUsd: 3_040_000,
    },
    USDY_0,
    { ...GHO_0, priceUsd: 0.997, pegDeviationBps: -30, netFlow1hUsd: -280_000 },
    {
      ...USDD_0,
      priceUsd: 0.9921,
      pegDeviationBps: -79,
      volume24hUsd: 29_480_000,
      netFlow1hUsd: -2_640_000,
      depth2pctUsd: 1_080_000,
      reserveRatioPct: 122.6,
      attestationAgeDays: 65,
    },
  ],
};

// --- frame 12: recovery begins (USDT repairs, USDD climbs) ---
const f12: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 42_970_000_000,
      netFlow1hUsd: -38_200_000,
      depth2pctUsd: 176_200_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 8_238_000_000,
      netFlow1hUsd: 10_100_000,
    },
    { ...DAI_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 410_000 },
    { ...USDE_0, priceUsd: 1.0002, pegDeviationBps: 2, netFlow1hUsd: 820_000 },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 440_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      volume24hUsd: 4_074_000_000,
      netFlow1hUsd: 1_900_000,
    },
    { ...TUSD_0, priceUsd: 0.9995, pegDeviationBps: -5 },
    { ...SDAI_0, netFlow1hUsd: 240_000 },
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    { ...GHO_0, priceUsd: 0.9971, pegDeviationBps: -29 },
    {
      ...USDD_0,
      priceUsd: 0.9938,
      pegDeviationBps: -62,
      volume24hUsd: 30_120_000,
      netFlow1hUsd: -1_640_000,
      depth2pctUsd: 1_280_000,
      reserveRatioPct: 123.4,
      attestationAgeDays: 65,
    },
  ],
};

// --- frame 13: recovery continues ---
const f13: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      volume24hUsd: 42_980_000_000,
      netFlow1hUsd: -16_400_000,
      depth2pctUsd: 178_400_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 8_240_000_000,
      netFlow1hUsd: 8_200_000,
    },
    { ...DAI_0, priceUsd: 1.0, pegDeviationBps: 0, volume24hUsd: 251_600_000 },
    { ...USDE_0, priceUsd: 1.0003, pegDeviationBps: 3 },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1 },
    {
      ...FDUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      netFlow1hUsd: 640_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9995,
      pegDeviationBps: -5,
      netFlow1hUsd: -280_000,
    },
    { ...SDAI_0, priceUsd: 1.0003, pegDeviationBps: 3 },
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, depth2pctUsd: 2_580_000 },
    {
      ...GHO_0,
      priceUsd: 0.9972,
      pegDeviationBps: -28,
      netFlow1hUsd: -190_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9948,
      pegDeviationBps: -52,
      volume24hUsd: 30_480_000,
      netFlow1hUsd: -820_000,
      depth2pctUsd: 1_480_000,
      reserveRatioPct: 125.2,
      attestationAgeDays: 65,
    },
  ],
};

// --- frame 14: recovery near-complete, flows reversing ---
const f14: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 0.9999,
      pegDeviationBps: -1,
      volume24hUsd: 42_990_000_000,
      netFlow1hUsd: 4_200_000,
      depth2pctUsd: 181_600_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0,
      pegDeviationBps: 0,
      volume24hUsd: 8_242_000_000,
      netFlow1hUsd: 6_100_000,
    },
    { ...DAI_0, priceUsd: 0.9999, pegDeviationBps: -1, netFlow1hUsd: -140_000 },
    {
      ...USDE_0,
      priceUsd: 1.0004,
      pegDeviationBps: 4,
      netFlow1hUsd: 1_600_000,
    },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 290_000 },
    { ...FDUSD_0, priceUsd: 0.9997, pegDeviationBps: -3 },
    { ...TUSD_0, priceUsd: 0.9996, pegDeviationBps: -4 },
    { ...SDAI_0, priceUsd: 1.0003, pegDeviationBps: 3, netFlow1hUsd: 190_000 },
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    { ...GHO_0, priceUsd: 0.9973, pegDeviationBps: -27 },
    {
      ...USDD_0,
      priceUsd: 0.9954,
      pegDeviationBps: -46,
      volume24hUsd: 30_640_000,
      netFlow1hUsd: -320_000,
      depth2pctUsd: 1_640_000,
      reserveRatioPct: 126.4,
      attestationAgeDays: 65,
    },
  ],
};

// --- frame 15: USDC attestation update + mint event ---
const f15: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0,
      pegDeviationBps: 0,
      volume24hUsd: 42_996_000_000,
      netFlow1hUsd: 8_400_000,
      depth2pctUsd: 183_000_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 8_252_000_000,
      netFlow1hUsd: 24_600_000,
      marketCapUsd: 42_230_000_000,
      attestationAgeDays: 0,
    },
    { ...DAI_0, priceUsd: 0.9999, pegDeviationBps: -1, netFlow1hUsd: 320_000 },
    {
      ...USDE_0,
      priceUsd: 1.0005,
      pegDeviationBps: 5,
      netFlow1hUsd: 2_100_000,
    },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1 },
    {
      ...FDUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 4_068_000_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9996,
      pegDeviationBps: -4,
      netFlow1hUsd: -160_000,
    },
    { ...SDAI_0, priceUsd: 1.0003, pegDeviationBps: 3 },
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    { ...GHO_0, priceUsd: 0.9973, pegDeviationBps: -27 },
    {
      ...USDD_0,
      priceUsd: 0.9958,
      pegDeviationBps: -42,
      volume24hUsd: 30_720_000,
      netFlow1hUsd: -140_000,
      depth2pctUsd: 1_720_000,
      reserveRatioPct: 127.2,
      attestationAgeDays: 65,
    },
  ],
};

// --- frame 16: USDC mint continues ---
const f16: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 42_998_000_000,
      netFlow1hUsd: 10_800_000,
      depth2pctUsd: 183_600_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 8_262_000_000,
      netFlow1hUsd: 32_400_000,
      marketCapUsd: 42_258_000_000,
      attestationAgeDays: 0,
      depth2pctUsd: 97_800_000,
    },
    {
      ...DAI_0,
      priceUsd: 0.9999,
      pegDeviationBps: -1,
      volume24hUsd: 248_800_000,
    },
    {
      ...USDE_0,
      priceUsd: 1.0005,
      pegDeviationBps: 5,
      volume24hUsd: 413_600_000,
    },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 380_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      netFlow1hUsd: -890_000,
    },
    { ...TUSD_0, priceUsd: 0.9996, pegDeviationBps: -4 },
    { ...SDAI_0, priceUsd: 1.0003, pegDeviationBps: 3, netFlow1hUsd: 200_000 },
    {
      ...CRVUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      volume24hUsd: 15_220_000,
    },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8, netFlow1hUsd: 105_000 },
    {
      ...GHO_0,
      priceUsd: 0.9973,
      pegDeviationBps: -27,
      depth2pctUsd: 2_110_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9961,
      pegDeviationBps: -39,
      netFlow1hUsd: -80_000,
      depth2pctUsd: 1_780_000,
      reserveRatioPct: 127.8,
      attestationAgeDays: 64,
    },
  ],
};

// --- frame 17: USDC mint tail ---
const f17: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 42_992_000_000,
      netFlow1hUsd: 11_600_000,
      depth2pctUsd: 183_900_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0001,
      pegDeviationBps: 1,
      volume24hUsd: 8_258_000_000,
      netFlow1hUsd: 28_100_000,
      marketCapUsd: 42_242_000_000,
      attestationAgeDays: 0,
      depth2pctUsd: 97_200_000,
    },
    { ...DAI_0, priceUsd: 0.9999, pegDeviationBps: -1, netFlow1hUsd: -540_000 },
    {
      ...USDE_0,
      priceUsd: 1.0005,
      pegDeviationBps: 5,
      netFlow1hUsd: 2_600_000,
    },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 320_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 4_058_000_000,
      netFlow1hUsd: -1_240_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9996,
      pegDeviationBps: -4,
      netFlow1hUsd: -220_000,
    },
    SDAI_0,
    { ...CRVUSD_0, priceUsd: 0.9998, pegDeviationBps: -2 },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    {
      ...GHO_0,
      priceUsd: 0.9973,
      pegDeviationBps: -27,
      netFlow1hUsd: -170_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9963,
      pegDeviationBps: -37,
      volume24hUsd: 30_200_000,
      netFlow1hUsd: -260_000,
      depth2pctUsd: 1_812_000,
      reserveRatioPct: 128.0,
      attestationAgeDays: 64,
    },
  ],
};

// --- frame 18: calm returning ---
const f18: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 42_160_000_000,
      netFlow1hUsd: 12_100_000,
      depth2pctUsd: 183_800_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0,
      pegDeviationBps: 0,
      volume24hUsd: 8_090_000_000,
      netFlow1hUsd: 6_800_000,
      marketCapUsd: 42_220_000_000,
      attestationAgeDays: 0,
      depth2pctUsd: 96_800_000,
    },
    { ...DAI_0, priceUsd: 0.9999, pegDeviationBps: -1, netFlow1hUsd: -720_000 },
    {
      ...USDE_0,
      priceUsd: 1.0005,
      pegDeviationBps: 5,
      netFlow1hUsd: 2_600_000,
    },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 300_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 3_996_000_000,
      netFlow1hUsd: -1_380_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9996,
      pegDeviationBps: -4,
      netFlow1hUsd: -250_000,
    },
    { ...SDAI_0, netFlow1hUsd: 190_000 },
    {
      ...CRVUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      volume24hUsd: 15_210_000,
    },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8 },
    {
      ...GHO_0,
      priceUsd: 0.9973,
      pegDeviationBps: -27,
      netFlow1hUsd: -180_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9964,
      pegDeviationBps: -36,
      volume24hUsd: 25_420_000,
      netFlow1hUsd: -380_000,
      depth2pctUsd: 1_834_000,
      reserveRatioPct: 128.2,
      attestationAgeDays: 64,
    },
  ],
};

// --- frame 19: calm baseline (seamless return to f00) ---
const f19: Frame = {
  rows: [
    {
      ...USDT_0,
      priceUsd: 1.0002,
      pegDeviationBps: 2,
      volume24hUsd: 42_110_000_000,
      netFlow1hUsd: 12_200_000,
    },
    {
      ...USDC_0,
      priceUsd: 1.0,
      pegDeviationBps: 0,
      volume24hUsd: 8_055_000_000,
      netFlow1hUsd: 4_300_000,
      marketCapUsd: 42_200_000_000,
      attestationAgeDays: 0,
    },
    { ...DAI_0, priceUsd: 0.9999, pegDeviationBps: -1, netFlow1hUsd: -800_000 },
    {
      ...USDE_0,
      priceUsd: 1.0005,
      pegDeviationBps: 5,
      netFlow1hUsd: 2_750_000,
    },
    { ...PYUSD_0, priceUsd: 1.0001, pegDeviationBps: 1, netFlow1hUsd: 305_000 },
    {
      ...FDUSD_0,
      priceUsd: 0.9997,
      pegDeviationBps: -3,
      volume24hUsd: 3_986_000_000,
      netFlow1hUsd: -1_410_000,
    },
    {
      ...TUSD_0,
      priceUsd: 0.9996,
      pegDeviationBps: -4,
      netFlow1hUsd: -245_000,
    },
    { ...SDAI_0, priceUsd: 1.0003, pegDeviationBps: 3, netFlow1hUsd: 182_000 },
    {
      ...CRVUSD_0,
      priceUsd: 0.9998,
      pegDeviationBps: -2,
      volume24hUsd: 15_200_000,
    },
    { ...USDY_0, priceUsd: 1.0008, pegDeviationBps: 8, netFlow1hUsd: 96_000 },
    {
      ...GHO_0,
      priceUsd: 0.9973,
      pegDeviationBps: -27,
      netFlow1hUsd: -182_000,
    },
    {
      ...USDD_0,
      priceUsd: 0.9965,
      pegDeviationBps: -35,
      volume24hUsd: 24_860_000,
      netFlow1hUsd: -418_000,
      depth2pctUsd: 1_840_000,
      reserveRatioPct: 128.3,
      attestationAgeDays: 64,
    },
  ],
};

export const frames: readonly Frame[] = [
  f00,
  f01,
  f02,
  f03,
  f04,
  f05,
  f06,
  f07,
  f08,
  f09,
  f10,
  f11,
  f12,
  f13,
  f14,
  f15,
  f16,
  f17,
  f18,
  f19,
];
