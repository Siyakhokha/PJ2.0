import React, { useContext } from 'react';
import StarRating from 'react-svg-star-rating';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductReviewDetails = () => {
  const { ReviewData, handleAccordionClick } = useContext(ShopifyData);
  return (
    <>
      <p className="product-review-container__stars">
        {ReviewData.response && (
          <StarRating
            unit="float"
            size={16}
            isReadOnly
            count={1}
            innerRadius={20}
            emptyColor="#fff"
            initialRating={ReviewData.response.value}
          />
        )}
        <span>
          {ReviewData.response &&
            ReviewData.response.bottomline.average_score.toFixed(1)}
        </span>
      </p>
      {ReviewData.response && (
        <a
          href="#Reviews"
          className="product-review-container__numberOfReviews"
          onClick={() => handleAccordionClick(1)}
        >
          Reviews({ReviewData.response.bottomline.total_review})
        </a>
      )}
    </>
  );
};

export default ProductReviewDetails;
