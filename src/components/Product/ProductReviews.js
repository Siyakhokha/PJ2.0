import StarRating from 'react-svg-star-rating';
import ReactPaginate from 'react-paginate';
import React, { useContext } from 'react';
import { ShopifyData } from '../../Context/ShopifyData';

const ProductReviews = () => {
  const { ReviewData, pageCount, handlePageClick } = useContext(ShopifyData);

  return (
    <>
      {ReviewData.response &&
        ReviewData.response.reviews.map(i => {
          return (
            <div className="product-accordion__item--reviews-item">
              <div className="product-accordion__item--reviews-item-top">
                <h5>{unescape(i.user.display_name.replace(/&#x27;/g, "'"))}</h5>
                <p>{i.created_at.split('T')[0]}</p>
              </div>
              <StarRating
                unit="float"
                isReadOnly={true}
                initialRating={i.score}
                innerRadius={20}
                size={15}
              />
              <p>{unescape(i.content.replace(/&#x27;/g, "'"))}</p>
              <p></p>
            </div>
          );
        })}

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination-2'}
        pageClassName={'page-number'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-number'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-number'}
        nextLinkClassName={'page-number'}
        breakClassName={'page-number'}
        breakLinkClassName={'page-number'}
        activeClassName={'active'}
      />
    </>
  );
};

export default ProductReviews;
