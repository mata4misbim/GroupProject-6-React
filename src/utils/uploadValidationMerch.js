import {
  validateCoverFile,
  validateTitle,
  validateDescription,
  validatePrice,
} from "./uploadValidation";

export const MERCH_TYPES = [
  { value: "tshirt", label: "T-shirt" },
  { value: "vinyl", label: "Vinyl" },
  { value: "cd", label: "CD" },
  { value: "cassette", label: "Cassette" },
  { value: "poster", label: "Poster" },
  { value: "snapback", label: "Snapback" },
  { value: "tote", label: "Tote bag" },
];

export const MERCH_LIMITS = {
  MAX_VARIANTS: 50,
  WEIGHT_MIN: 0,
  WEIGHT_MAX: 50000,
  STOCK_MIN: 0,
  STOCK_MAX: 99999,
  SKU_MAX: 50,
};

export const validateVariant = (variant, index) => {
  const prefix = `Variant ${index + 1}`;
  const hasSize = (variant.size || "").trim().length > 0;
  const hasColor = (variant.color || "").trim().length > 0;
  if (!hasSize && !hasColor) return `${prefix}: enter at least Size or Color`;
  if (variant.stock === "" || variant.stock == null) return `${prefix}: stock is required`;
  const stock = Number(variant.stock);
  if (!Number.isFinite(stock) || !Number.isInteger(stock)) return `${prefix}: stock must be an integer`;
  if (stock < MERCH_LIMITS.STOCK_MIN) return `${prefix}: stock cannot be negative`;
  if (stock > MERCH_LIMITS.STOCK_MAX) return `${prefix}: stock too high (max ${MERCH_LIMITS.STOCK_MAX})`;
  if ((variant.sku || "").length > MERCH_LIMITS.SKU_MAX) return `${prefix}: SKU too long (max ${MERCH_LIMITS.SKU_MAX} chars)`;
  return null;
};

export const validateVariants = (variants) => {
  if (!Array.isArray(variants)) return null;
  if (variants.length > MERCH_LIMITS.MAX_VARIANTS) return `Too many variants (max ${MERCH_LIMITS.MAX_VARIANTS})`;
  const skus = variants.map((v) => (v.sku || "").trim()).filter((s) => s.length > 0);
  const dupes = skus.filter((s, i) => skus.indexOf(s) !== i);
  if (dupes.length > 0) return `Duplicate SKU: "${dupes[0]}" — each SKU must be unique`;
  for (let i = 0; i < variants.length; i++) {
    const err = validateVariant(variants[i], i);
    if (err) return err;
  }
  return null;
};

export const validateWeight = (weight) => {
  if (weight === "" || weight == null) return null;
  const n = Number(weight);
  if (!Number.isFinite(n)) return "Weight must be a number";
  if (n < MERCH_LIMITS.WEIGHT_MIN) return "Weight cannot be negative";
  if (n > MERCH_LIMITS.WEIGHT_MAX) return `Weight too high (max ${MERCH_LIMITS.WEIGHT_MAX} g)`;
  return null;
};

export const validateMerchType = (type) => {
  if (!type) return "Type is required";
  const allowed = MERCH_TYPES.map((t) => t.value);
  if (!allowed.includes(type)) return "Invalid type";
  return null;
};

export const validateMerchForm = (form) => {
  const errors = {
    cover: validateCoverFile(form.cover),
    title: validateTitle(form.title),
    type: validateMerchType(form.type),
    weight: validateWeight(form.weight),
    description: validateDescription(form.description),
    price: validatePrice(form.price, false),
    variants: validateVariants(form.variants),
  };
  const cleaned = Object.fromEntries(Object.entries(errors).filter(([, v]) => v !== null));
  return { isValid: Object.keys(cleaned).length === 0, errors: cleaned };
};
