import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { fetchData } from "./ApiCall";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Breacrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import Swiper from "react-id-swiper";
import moment from "moment";

import "swiper/css/swiper.css";
import { dateDiffrence, dateFormat } from "./Utile";
import { UncontrolledCarousel } from "reactstrap";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";

function DetailPage({ match }) {
  const [propertyDetail, setPropertyDetail] = useState([]);
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [propertyImages, setPropertyImages] = useState([]);

  async function fetchApiCall({ PropertyID, type = "offersSearch" }) {
    setPropertyLoading(true);
    const { status, properties, propertyLoading } = await fetchData({
      PropertyID,
      type,
    });
    if (status === 200) {
      if (type === "offerImages") {
        const imagedata =
          properties &&
          properties.map((property) => {
            return {
              src: property.Original,
              // key: property.ImageID
            };
          });
        setPropertyImages(imagedata);
      } else {
        setPropertyDetail(properties && properties[0]);
      }
    }
    setPropertyLoading(propertyLoading);
  }

  // render() {
  useEffect(() => {
    let isMounted = true;
    const PropertyID = match.params.id;
    if (isMounted) {
      fetchApiCall({ PropertyID });
      if (PropertyID) {
        fetchApiCall({
          page: 1,
          PropertyID: match.params.id,
          type: "offerImages",
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [match]);
  console.log({ propertyDetail, propertyImages });
  return (
    <React.Fragment>
      <Breacrumbs
        breadCrumbTitle="Properties Details"
        breadCrumbParent="Home"
        breadCrumbActive="Properties Details"
      />
      {propertyLoading ? (
        <Spinner />
      ) : (
        <Card className="overflow-hidden app-ecommerce-details">
          <CardBody className="pb-0">
            <Row className="mb-5 mt-2">
              <Col
                className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                sm="12"
                md="5"
                className="propertyDetails"
              >
                <UncontrolledCarousel
                  autoPlay={false}
                  // interval="500"
                  items={propertyImages}
                />
              </Col>

              <Col md="7" sm="12">
                <h3>
                  {propertyDetail.AreaLabel
                    ? `${propertyDetail.AreaLabel}, `
                    : ""}
                  {propertyDetail.CityLabel},{propertyDetail.CountyLabel}
                </h3>
                <p className="text-muted">
                  {`${dateDiffrence(
                    propertyDetail.FirstDate,
                    "vechime"
                  )} on the market - ${moment(propertyDetail.FirstDate).format(
                    dateFormat
                  )}`}
                </p>
                <div className="d-flex flex-wrap">
                  <h3 className="text-primary">
                    EUR {propertyDetail.LastPriceEur}
                  </h3>
                </div>
                <hr />
                <p>{propertyDetail.Description}</p>

                <hr />
                <h4>Sources</h4>

                <ul>
                  <a target="_blank" href={propertyDetail.LastSiteLink}>
                    <l1>{propertyDetail.LastSiteLink}</l1>
                  </a>
                </ul>

                <hr />

                <p className="my-50">
                  <span>Owner</span>
                  <span className="mx-50">-</span>
                  <span className="text-primary">
                    {propertyDetail &&
                      propertyDetail.PhoneNumbers &&
                      propertyDetail.PhoneNumbers.join(" ,")}
                  </span>
                </p>

                {/* <div className='d-flex flex-wrap social-media-btns'>
                  <Button.Ripple
                    className='mr-1 btn-icon '
                    color='primary'
                    outline
                  >
                    <Facebook size={15} />
                  </Button.Ripple>
                  <Button.Ripple
                    className='mr-1 btn-icon '
                    color='info'
                    outline
                  >
                    <Twitter size={15} />
                  </Button.Ripple>
                  <Button.Ripple
                    className='mr-1 btn-icon '
                    color='danger'
                    outline
                  >
                    <Youtube size={15} />
                  </Button.Ripple>
                  <Button.Ripple
                    className='btn-icon '
                    color='primary'
                    outline
                  >
                    <Instagram size={15} />
                  </Button.Ripple>
                </div> */}
              </Col>
            </Row>
          </CardBody>
          {/* <Row>
            <Col sm='12'>
              <Row className='item-features py-5 mt-5'>
                <Col className='text-center' md='4' sm='12'>
                  <div className='w-50 mx-auto'>
                    <Award className='text-primary mb-1' size={42} />
                    <p className='font-medium-2 text-bold-600 mb-0'>
                      100% Original
                    </p>
                    <p>
                      Chocolate bar candy canes ice cream toffee cookie halvah.
                    </p>
                  </div>
                </Col>
                <Col className='text-center' md='4' sm='12'>
                  <div className='w-50 mx-auto'>
                    <Clock className='text-primary mb-1' size={42} />
                    <p className='font-medium-2 text-bold-600 mb-0'>
                      10 Day Replacement
                    </p>
                    <p>Marshmallow biscuit donut dragée fruitcake wafer.</p>
                  </div>
                </Col>
                <Col className='text-center' md='4' sm='12'>
                  <div className='w-50 mx-auto'>
                    <Shield className='text-primary mb-1' size={42} />
                    <p className='font-medium-2 text-bold-600 mb-0'>
                      1 Year Warranty
                    </p>
                    <p>Cotton candy gingerbread cake I love sugar sweet.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <CardBody>
            <Row>
              <Col className='details-page-swiper text-center mt-5' sm='12'>
                <div className='heading-section mb-3'>
                  <h2 className='text-uppercase mb-50'>Related Products</h2>
                  <p>People also search for this items</p>
                </div>
                <Swiper {...swiperParams}>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        Beats by Dr. Dre - Powerbeats2 Wireless Earbud
                        Headphones - Black/Red
                      </p>
                      <small>By Dr. Dre</small>
                    </div>
                    <div className='img-container'>
                      <img src={watch} alt='watch' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $129
                    </p>
                  </div>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        Apple - Apple Watch Nike+ 42mm Silver Aluminum Case
                        Silver/Volt Nike Sport Band - Silver Aluminum
                      </p>
                      <small>By Apple</small>
                    </div>
                    <div className='img-container'>
                      <img src={earphones} alt='earphones' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $399
                    </p>
                  </div>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        Google - Google Home - White/Slate fabric
                      </p>
                      <small>By Google</small>
                    </div>
                    <div className='img-container'>
                      <img src={laptop} alt='laptop' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $1999.99
                    </p>
                  </div>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        Amazon - Fire TV Stick with Alexa Voice Remote - Black
                      </p>
                      <small>By Amazon</small>
                    </div>
                    <div className='img-container'>
                      <img src={homepod} alt='homepod' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $39.99
                    </p>
                  </div>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        Google - Chromecast Ultra - Black
                      </p>
                      <small>By Google</small>
                    </div>
                    <div className='img-container'>
                      <img src={iphoneX} alt='homepod' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $69.99
                    </p>
                  </div>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        Beats by Dr. Dre - Beats EP Headphones - White
                      </p>
                      <small>Beats by Dr. Dre</small>
                    </div>
                    <div className='img-container'>
                      <img src={headphones} alt='homepod' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $129.99
                    </p>
                  </div>
                  <div>
                    <div className='title mb-1'>
                      <p className='font-medium-1 text-bold-600 truncate mb-0'>
                        LG - 40' Class (39.5' Diag.) - LED - 1080p - HDTV -
                        Black
                      </p>
                      <small>by LG</small>
                    </div>
                    <div className='img-container'>
                      <img src={mouse} alt='homepod' />
                    </div>
                    <div className='ratings  ml-1'>
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#ff9f43' stroke='#ff9f43' />
                      <Star size={15} fill='#fff' stroke='#b8c2cc' />
                    </div>
                    <p className='text-bold-500 font-medium-2 text-primary mt-50'>
                      $279.99
                    </p>
                  </div>
                </Swiper>
              </Col>
            </Row>
          </CardBody> */}
        </Card>
      )}
    </React.Fragment>
  );
}
export default DetailPage;
