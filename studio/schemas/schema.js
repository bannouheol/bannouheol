// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import category from "./document/category";
import product from "./document/product";
import vendor from "./document/vendor";
import collection from "./document/collection";
import page from "./document/page";
import blogPost from "./document/blog/post";
import blogCategory from "./document/blog/category";
import profile from "./document/profile";

import blockContent from "./object/blockContent";
import productVariant from "./object/productVariant";
import dvdFeature from "./object/dvdFeature";
import bookFeature from "./object/bookFeature";
import youtube from "./object/youtube";
import price from "./object/price";

import localeString from "./locale/String";
import localeSlug from "./locale/Slug";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";

import siteSettings from "./document/siteSettings";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    product,
    collection,
    profile,
    category,
    vendor,
    dvdFeature,
    bookFeature,
    page,
    blogPost,
    blogCategory,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    localeString,
    localeSlug,
    localeText,
    localeBlockContent,
    youtube,
    productVariant,
    price,
    siteSettings
  ])
});
