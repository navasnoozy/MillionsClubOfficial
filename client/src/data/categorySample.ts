// dummyCategories.js
export const dummyCategories = [
  {
    _id: "66c0abcd1234567890abcdef",
    name: "Electronics",
    slug: "electronics",
  },
  {
    _id: "66c0abcd1234567890abcdf4",
    name: "Books",
    slug: "books",
  },
  {
    _id: "66c0abcd1234567890abcdf8",
    name: "Clothing",
    slug: "clothing",
  },
];

// dummySubcategories.js
export const dummySubcategories = [
  // Electronics
  {
    _id: "66c0abcd1234567890abcdf1",
    name: "Phones",
    slug: "phones",
    parentCategoryId: "66c0abcd1234567890abcdef",
  },
  {
    _id: "66c0abcd1234567890abcdf2",
    name: "Laptops",
    slug: "laptops",
    parentCategoryId: "66c0abcd1234567890abcdef",
  },
  {
    _id: "66c0abcd1234567890abcdf3",
    name: "Accessories",
    slug: "accessories",
    parentCategoryId: "66c0abcd1234567890abcdef",
  },

  // Books
  {
    _id: "66c0abcd1234567890abcdf5",
    name: "Fiction",
    slug: "fiction",
    parentCategoryId: "66c0abcd1234567890abcdf4",
  },
  {
    _id: "66c0abcd1234567890abcdf6",
    name: "Non-fiction",
    slug: "non-fiction",
    parentCategoryId: "66c0abcd1234567890abcdf4",
  },
  {
    _id: "66c0abcd1234567890abcdf7",
    name: "Children's Books",
    slug: "childrens-books",
    parentCategoryId: "66c0abcd1234567890abcdf4",
  },

  // Clothing
  {
    _id: "66c0abcd1234567890abcdf9",
    name: "Men",
    slug: "men",
    parentCategoryId: "66c0abcd1234567890abcdf8",
  },
  {
    _id: "66c0abcd1234567890abcdfa",
    name: "Women",
    slug: "women",
    parentCategoryId: "66c0abcd1234567890abcdf8",
  },
  {
    _id: "66c0abcd1234567890abcdfb",
    name: "Kids",
    slug: "kids",
    parentCategoryId: "66c0abcd1234567890abcdf8",
  },
];
