import React, { createContext, useState, useRef, useEffect } from 'react';
import Alerts from '../components/Product/Alerts';
import Loading from '../helpers/Loading/Loading';
import { GET_PRODUCT_BY_HANDLE } from '../GraphQL/Queries/getProductByHandle';
import { useQuery } from '@apollo/client';

export const ShopifyData = createContext();
const ShopifyDataProvider = ({ children }) => {
  let ModuleDataObject = {};
  const [ReviewData, setReviewData] = useState('');
  const [pageCount, setpageCount] = useState(10);
  const [pageNumber, setpageNumber] = useState(1);
  const [ProductTitle, setProductTitle] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [ProductID, setProductID] = useState({});
  const [accordionActive, setAccordionActive] = useState(-1);
  const [QuantityError, setQuantityError] = useState(false);
  const [ReadyForShipping, setReadyForShipping] = useState(1);
  const [Price, setPrice] = useState('');
  const [Total, setTotal] = useState('');
  const [Taxes, setTaxes] = useState('');
  const [Subtotal, setSubtotal] = useState('');
  const quantityRef = useRef(quantity);
  const variantRef = useRef(ProductID);
  const perPage = 10;
  const [step, setStep] = useState(-1);
  const [stepToPersonalDetails, setStepToPersonalDetail] = useState(false);
  const [NextStep, setNextStep] = useState(false);
  const pageStepCount = useRef(1);
  const bar = useRef();

  const stepperContainer = useRef();
  const prevSetRef = useRef();

  const targetModulesData = document.querySelectorAll(
    '.ik-shop-checkout > script[type="application/json"]',
  );

  targetModulesData.forEach(({ textContent }) => {
    ModuleDataObject = JSON.parse(textContent);
  });

  const getReviews = async () => {
    const url = `${process.env.YOTPO_URL}/${
      process.env.YOTPO_CLIENT_KEY
    }/products/${ModuleDataObject.product_id.toString()}/reviews.json?per_page=${perPage}&page=${pageNumber}`;

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await fetch(url, options);
      const ReviewData = await res.json();
      setReviewData(ReviewData);
      setpageCount(
        Math.ceil(ReviewData.response.bottomline.total_review / perPage),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadReviews = async (
    email,
    firstname,
    review,
    review_score,
    review_title,
  ) => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: 'https://shop.ikhokha.com',
        appkey: process.env.YOTPO_CLIENT_KEY,
        sku: ModuleDataObject.product_Slug,
        product_url: `https://shop.ikhokha.com/products/${ModuleDataObject.product_Slug}`,
        product_title: ProductTitle,
        display_name: firstname,
        email: email,
        review_content: review,
        review_title: review_title,
        review_score: parseInt(review_score),
      }),
    };
    try {
      const res = await fetch(
        'https://api.yotpo.com/v1/widget/reviews',
        options,
      );
      await res.json();
    } catch (error) {
      <Alerts ErrortextAlert="We are experiencing issues with submit your Review. please refresh you page and try again." />;
    }
  };

  const handlePageClick = selectedPage => {
    setpageNumber(selectedPage.selected + 1);
  };

  const onReadyForShipping = e => {
    setReadyForShipping(e);
  };

  const handleAccordionClick = index => {
    let activeTab;
    if (accordionActive === index) {
      activeTab = -1;
    } else {
      activeTab = index;
    }
    setAccordionActive(activeTab);
  };

  const adJustQuantity = amt => {
    let newQuantity = quantity + amt;
    if (newQuantity === -1) {
      newQuantity = 0;
    }
    if (newQuantity <= 15) {
      setQuantity(parseInt(newQuantity));
    } else {
      setQuantityError(true);
      setQuantity(1);
      setTimeout(() => {
        setQuantityError(false);
      }, 3000);
    }
  };

  //custom Hook
  const usePrevious = data => {
    const ref = useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };

  const mobiQuantity = e => {
    if (e.target.value <= 15) {
      setQuantity(parseInt(e.target.value));
    } else {
      setQuantityError(true);
      setQuantity(1);
      setTimeout(() => {
        setQuantityError(false);
      }, 3000);
    }
  };

  const nextClick = () => {
    setNextStep(false);
    setStep(step + 1);
    if (step === -1) {
      setTimeout(() => {
        setNextStep(true);
      }, 500);
    } else {
      setNextStep(false);
    }
  };
  const prevClick = () => {
    setStep(step - 1);
  };

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_HANDLE, {
    variables: {
      productByHandleHandle: ModuleDataObject.product_Slug,
      variantsFirst: 1,
      imagesFirst: 3,
    },
  });

  if (loading) return <Loading />;

  if (error)
    return (
      <Alerts ErrortextAlert={`We are experiencing issues with loading data`} />
    );
  if (!data.productByHandle)
    return (
      <Alerts ErrortextAlert="Cant find product please check product slug." />
    );
  let productName = data.productByHandle.title.replace('(SIM Included)', '');
  let productImage = data.productByHandle.images.edges[2].node.transformedSrc;

  return (
    <ShopifyData.Provider
      value={{
        ModuleDataObject,
        ReviewData,
        pageCount,
        pageNumber,
        quantity,
        ProductID,
        quantityRef,
        variantRef,
        data,
        ReadyForShipping,
        accordionActive,
        QuantityError,
        Taxes,
        Total,
        Subtotal,
        step,
        stepToPersonalDetails,
        pageStepCount,
        productImage,
        productName,
        setNextStep,
        NextStep,
        bar,
        stepperContainer,
        prevSetRef,
        usePrevious,
        setStepToPersonalDetail,
        prevClick,
        nextClick,
        setStep,
        setSubtotal,
        setTotal,
        setTaxes,
        setPrice,
        mobiQuantity,
        adJustQuantity,
        setAccordionActive,
        handleAccordionClick,
        onReadyForShipping,
        setReadyForShipping,
        setQuantity,
        setProductTitle,
        uploadReviews,
        setProductID,
        handlePageClick,
        getReviews,
      }}
    >
      {children}
    </ShopifyData.Provider>
  );
};

export default ShopifyDataProvider;
