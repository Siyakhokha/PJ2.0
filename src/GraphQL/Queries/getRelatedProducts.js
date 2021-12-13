import { gql } from '@apollo/client';

export const GET_Related_Products = gql`
query GetRelatedProducts(
    $productRecommendationsProductId: ID!,
     $imagesFirst: Int,
      $variantsFirst: Int,
      
       )
        {
  productRecommendations(productId: $productRecommendationsProductId) {
    title
    handle
    images(first: $imagesFirst) {
      edges {
        node {
          originalSrc
          id
          altText
        }
      }
    }
    variants(first: $variantsFirst) {
      edges {
        node {
          priceV2 {
            amount
          }
        }
      }
    }
    metafield(namespace: "yotpo", key: "reviews_average") {
      key
      value
    }
    onlineStoreUrl
  }
}
`;
