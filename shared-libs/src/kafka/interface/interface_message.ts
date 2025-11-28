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
  updatedFields: {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
    image?: string;
    providers?: Provider[];
    providerIds?: Map<string, string>;
    isActive?: boolean;
  };
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
    name?: string;
    slug?: string;
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
    name?: string;
    slug?: string;
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
  basePrice?: string;
  images?: {
    secure_url: string;
    public_id: string;
  }[];
  variantIds?: string[];
  isActive: boolean;
}

export interface ProductUpdatedMsg {
  productId: string;
  updatedFields: {
    title?: string;
    brand?: string;
    categoryId?: string;
    subCategoryId?: string;
    basePrice?: number;
    images?: {
      secure_url: string;
      public_id: string;
    }[];
    description?: string;
    isActive?: boolean;
    variantIds?: string[];
  };
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
  color: string;
  size: string;
  images: {
    secure_url: string;
    public_id: string;
  }[];
  isActive: boolean;
}

export interface VariantUpdatedMsg {
  variantId: string;
  productId: string;
  updatedFields: {
    color?: string;
    size?: string;
    images?: {
      secure_url: string;
      public_id: string;
    }[];
    isActive?: boolean;
  };
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
