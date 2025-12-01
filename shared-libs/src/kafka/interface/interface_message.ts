// =============================
// Common Types
// =============================
export type Role = "user" | "admin" | "moderator";
export type Provider = "credentials" | "google" | "github" | "facebook";

// =============================
// User Events
// =============================
export interface UserCreatedMsg {
  userId: string;
  name: string;
  email: string;
  role: Role;
  data?: any;
}

export interface UserUpdatedMsg {
  userId: string;
  email?: string;
  name?: string | undefined;
  password?: string | undefined;
  role?: Role | undefined;
  image?: string | undefined;
  providers?: Provider[];
  providerIds?: Map<string, string>;
  isActive?: boolean | undefined;
}

export interface UserDeletedMsg {
  userId: string;
  email?: string;
}

export interface EmailVerified {
  userId?: string;
  name?: string;
  email: string;
  data?: any;
}

// =============================
// Category Events
// =============================
export interface CategoryCreatedMsg {
  categoryId: string;
  name: string;
  slug: string;
  subcategoryIds?: string[];
}

export interface CategoryUpdatedMsg {
  categoryId: string;
  updatedFields: {
    name?: string | undefined;
    slug?: string | undefined;
    subcategoryIds?: string[];
  };
}

export interface CategoryDeletedMsg {
  categoryId: string;
}

// =============================
// Subcategory Events
// =============================
export interface SubcategoryCreatedMsg {
  subcategoryId: string;
  name: string;
  slug: string;
  parentCategoryId: string;
}

export interface SubcategoryUpdatedMsg {
  subcategoryId: string;
  updatedFields: {
    name?: string | undefined;
    slug?: string | undefined;
    parentCategoryId?: string;
  };
}

export interface SubcategoryDeletedMsg {
  subcategoryId: string;
  parentCategoryId: string;
}

// =============================
// Product Events
// =============================
export interface ProductCreatedMsg {
  productId: string;
  title: string;
  basePrice?: number;
  images?: {
    secure_url?: string | undefined;
    public_id?: string | undefined;
  }[];
  isActive: boolean;
}

export interface ProductUpdatedMsg {
  productId: string;
  title?: string | undefined;
  basePrice?: number | undefined;
  images?: {
    secure_url?: string | undefined;
    public_id?: string | undefined;
  }[];
  isActive?: boolean | undefined;
}

export interface ProductDeletedMsg {
  productId: string;
}

// =============================
// Variant Events
// =============================
export interface VariantCreatedMsg {
  variantId: string;
  productId: string;
  size: string;
  price: number;
  quantity: number;
  isActive: boolean;
}

export interface VariantUpdatedMsg {
  variantId: string;
  size?: string | undefined;
  price?: number | undefined;
  quantity?: number | undefined;
  isActive?: boolean | undefined;
}

export interface VariantDeletedMsg {
  variantId: string;
  productId: string;
}

// =============================
// Union of ALL messages
// =============================
export type AllMessages =
  | UserCreatedMsg
  | UserUpdatedMsg
  | UserDeletedMsg
  | EmailVerified
  | CategoryCreatedMsg
  | CategoryUpdatedMsg
  | CategoryDeletedMsg
  | SubcategoryCreatedMsg
  | SubcategoryUpdatedMsg
  | SubcategoryDeletedMsg
  | ProductCreatedMsg
  | ProductUpdatedMsg
  | ProductDeletedMsg
  | VariantCreatedMsg
  | VariantUpdatedMsg
  | VariantDeletedMsg;
