import { gql } from '@apollo/client';

export const GET_PRODUCT_BY_HANDLE = gql`
  query GetProductByHandle(
    $productByHandleHandle: String!
    $variantsFirst: Int
    $imagesFirst: Int
  ) {
    productByHandle(handle: $productByHandleHandle) {
      title
       id
      descriptionHtml
      variants(first: $variantsFirst) {
        edges {
          node {
            price
            id
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      descriptionTagYotpoReviewsAvg: metafield(
        namespace: "yotpo"
        key: "reviews_average"
      ) {
        value
        type
      }
      descriptionTagTop: metafield(
        namespace: "global"
        key: "description_tag"
      ) {
        value
        type
      }
      descriptionTagHeader: metafield(
        namespace: "details"
        key: "short_description2_heading"
      ) {
        value
        type
      }
      descriptionTagContent: metafield(
        namespace: "details"
        key: "short_description2_content"
      ) {
        value
        type
      }
      descriptionTagDelivery: metafield(
        namespace: "extra-info"
        key: "delivery"
      ) {
        value
        type
      }
      descriptionTagMoneyBack: metafield(
        namespace: "extra-info"
        key: "money-back"
      ) {
        value
        type
      }
      descriptionTagSupport: metafield(
        namespace: "extra-info"
        key: "support"
      ) {
        value
        type
      }

      descriptionTagYotpoReviewCount: metafield(
        namespace: "yotpo"
        key: "reviews_count"
      ) {
        value
        type
      }
      images(first: $imagesFirst) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
      media(first: 5) {
        edges {
          node {
            mediaContentType
            alt
            ... on MediaImage {
              image {
                originalSrc
                transformedSrc
                altText
              }
            }
            ... on ExternalVideo {
              id
              embeddedUrl
            }
          }
        }
      }
    }
  }
`;
