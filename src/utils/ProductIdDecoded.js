export const ProductIdDecoded = id => {
  let NewId = Buffer.from(id, 'base64');
  let CleanId = NewId.toString().replace('gid://shopify/Product/', '');
  return CleanId;
};
