import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ListingSidebar from "./Sidebar";
import ShopContent from "./ShopContent";

import { fetchData } from "./ApiCall";
import { countryFetch } from "../../redux/actions/argus/argusActions";

const mql = window.matchMedia(`(min-width: 992px)`);

function Shop({ countryFetch }) {
  const defaultPagination = {
    TotalCount: 0,
    CurrentPage: 0,
    NextPage: 1,
    PageCount: 0,
  };
  const [sidebarDocked, setDidebarDocked] = useState(mql.matches);
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [properties, setProperties] = useState();
  const [pagination, setPagination] = useState(defaultPagination);
  const [country, setCountry] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [comfort, setComfort] = useState("");
  const [division, setDivision] = useState("");
  const [floor, setFloor] = useState("");
  const [lastPriceEur, setLastPriceEur] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [livingArea, setLivingArea] = useState("");

  // const [bathroom, setBathroom] = useState("");

  const onSetSidebarOpen = (open) => {
    setsidebarOpen(open);
  };

  const mediaQueryChanged = () => {
    setDidebarDocked(mql.matches);
    setsidebarOpen(false);
  };

  async function fetchApiCall({
    page = pagination.NextPage,
    type = "offersSearch",
    County = country,
    TransactionType = transactionType,
    PropertyType = propertyType,
    RoomCount = roomCount,
    Comfort = comfort,
    Division = division,
    Floor = floor,
    LastPriceEur = lastPriceEur,
    YearBuilt = yearBuilt,
    LivingArea = livingArea,
    // Bathroom = bathroom,
  }) {
    console.log(page);
    setPropertyLoading(true);
    const { status, properties, paginations } = await fetchData({
      page: page > 0 ? page : 1,
      type,
      County,
      TransactionType,
      PropertyType,
      RoomCount,
      Comfort,
      Division,
      Floor,
      LastPriceEur,
      YearBuilt,
      LivingArea,
      // Bathroom,
    });
    if (status === 200) {
      setProperties(properties);
      setPagination(paginations);
    }
    setPropertyLoading(false);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchApiCall({ page: pagination.NextPage });
    }
    // countryFetch({ page: 2 });
    mql.addListener(mediaQueryChanged);
    return () => {
      isMounted = false;
      mql.removeListener(mediaQueryChanged);
    };
  }, []);

  const extractCountry = (countries) => {
    const countryData =
      countries &&
      countries.length > 0 &&
      countries.map((country) => {
        return country.value;
      });
    const countryJoin = countryData ? countryData.join(",") : "";
    setCountry(countryJoin);
    fetchApiCall({ page: 1, County: countryJoin });
  };

  const handleFilter = (filterData) => {
    console.log({ filterData });

    const TransactionType =
      filterData &&
      filterData.TransactionType &&
      filterData.TransactionType.join(",");

    const PropertyType = filterData.PropertyType.join(",");
    const RoomCount = filterData.RoomCount.join(",");
    const Comfort = filterData.Comfort.join(",");
    const Division = filterData.Division.join(",");
    const Floor = filterData.Floor.join(",");
    const minPrice = filterData.minPrice;
    const maxPrice = filterData.maxPrice;
    const minYearBuilt = filterData.minYearBuilt;
    const maxYearBuilt = filterData.maxYearBuilt;
    const minLivingArea = filterData.minLivingArea;
    const maxLivingArea = filterData.maxLivingArea;
    console.log({ minPrice, maxPrice });
    const LastPriceEur = `${minPrice || (maxPrice ? 0 : "")}${
      minPrice || maxPrice ? "|" : ""
    }${maxPrice || (minPrice ? 0 : "")}`;
    const YearBuilt = `${minYearBuilt || (maxYearBuilt ? 0 : "")}${
      minYearBuilt || maxYearBuilt ? "|" : ""
    }${maxYearBuilt || (minYearBuilt ? 0 : "")}`;
    const LivingArea = `${minLivingArea || (maxLivingArea ? 0 : "")}${
      minLivingArea || maxLivingArea ? "|" : ""
    }${maxLivingArea || (minLivingArea ? 0 : "")}`;
    // const Bathroom = Bathroom.Bathroom.join(",");
    setTransactionType(TransactionType);
    setPropertyType(PropertyType);
    setRoomCount(RoomCount);
    setComfort(Comfort);
    setDivision(Division);
    setFloor(Floor);
    // setBathroom(Bathroom);
    setLastPriceEur(LastPriceEur);
    setYearBuilt(YearBuilt);
    setLivingArea(LivingArea);

    setPagination(defaultPagination);
    fetchApiCall({
      page: 1,
      TransactionType,
      PropertyType,
      RoomCount,
      Comfort,
      Division,
      Floor,
      LastPriceEur,
      YearBuilt,
      LivingArea,
      // Bathroom
    });
  };

  return (
    <React.Fragment>
      <div>
        <ListingSidebar
          countryFilter={(country) => extractCountry(country)}
          checkBoxFilter={(filter) => handleFilter(filter)}
        />
      </div>
      <ShopContent
        properties={properties}
        pagination={pagination}
        mainSidebar={onSetSidebarOpen}
        sidebar={sidebarOpen}
        handlePagination={(page) => fetchApiCall(page)}
        propertyLoading={propertyLoading}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    argus: state.argusGeneral.apis,
  };
};

export default connect(mapStateToProps, { countryFetch })(Shop);
