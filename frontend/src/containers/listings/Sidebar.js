import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { countryFetch } from '../../redux/actions/argus/argusActions';

function ListingSidebar({
  countryFilter,
  checkBoxFilter,
  countryFetch,
  argus,
  argus: { CountryData },
}) {
  const [checkBoxValue, setCheckBoxValue] = useState({
    TransactionType: [],
    PropertyType: [],
    RoomCount: [],
    Comfort: [],
    Division: [],
    Floor: [],
    Bathroom: [],
    minPrice: '',
    maxPrice: '',
    minYearBuilt: '',
    maxYearBuilt: '',
    minLivingArea: '',
    maxLivingArea: '',
    // LastPriceEur: '',
    // YearBuilt:'',
    // LivingArea:'',
  });
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      countryFetch({ page: 1 });
    }
    checkBoxFilter(checkBoxValue);
    return () => {
      isMounted = false;
    };
  }, [checkBoxValue]);

  const countryList =
    CountryData &&
    CountryData.length > 0 &&
    CountryData.map((country) => {
      return {
        value: country.CountyID,
        label: country.CountyName,
        isFixed: true,
      };
    });

  const TranactionTypeHandle = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;
    if (e.target.checked) {
      setCheckBoxValue((oldData) => ({
        ...oldData,
        [keyName]: checkBoxValue[keyName].concat(value),
      }));
    } else {
      const index = checkBoxValue[keyName].indexOf(value);
      if (index > -1) {
        checkBoxValue[keyName].splice(index, 1);
        console.log({ checkBoxValue });
      }
      checkBoxFilter(checkBoxValue);
      // setCheckBoxValue(checkBoxValue);
    }
  };

  const setLimitValue = (e, key) => {
    const value = e.target.value;
    // if (value) {
    setCheckBoxValue((olddata) => ({
      ...olddata,
      [key]: value,
    }));
    // }
  };

  const setTransactionType = (e, key) => {
    const TransactionData =
      e &&
      e.length > 0 &&
      e.map((tranaction) => {
        return tranaction.value;
      });

    // if (value) {
    setCheckBoxValue((olddata) => ({
      ...olddata,
      [key]: TransactionData,
    }));
    // }
  };

  console.log({ checkBoxValue });

  const TransactionTypeData = [
    { name: 'TransactionType', label: 'Sales', value: '1', isFixed: true },
    { name: 'TransactionType', label: 'Rental', value: '2', isFixed: true },
    { name: 'TransactionType', label: 'auctions', value: '4', isFixed: true },
    { name: 'TransactionType', label: 'Exchanges', value: '5', isFixed: true },
    {
      name: 'TransactionType',
      label: 'hospitality',
      value: '3',
      isFixed: true,
    },
  ];

  const PropertyTypeData = [
    { name: 'PropertyType', label: 'apatments', value: '2' },
    { name: 'PropertyType', label: 'houses', value: '3' },
    { name: 'PropertyType', label: 'commercial', value: '61' },
    { name: 'PropertyType', label: 'offices', value: '62' },
    { name: 'PropertyType', label: 'pensions', value: '64' },
    { name: 'PropertyType', label: 'industrial', value: '63' },
    { name: 'PropertyType', label: 'Farms', value: '65' },
    { name: 'PropertyType', label: 'special', value: '66' },
    { name: 'PropertyType', label: 'town', value: '71' },
    { name: 'PropertyType', label: 'Outside the built-up area', value: '72' },
  ];

  const RoomCountData = [
    { name: 'RoomCount', label: 'Studio', value: '1' },
    { name: 'RoomCount', label: '2 rooms', value: '2' },
    { name: 'RoomCount', label: '3 rooms', value: '3' },
    { name: 'RoomCount', label: '4 rooms', value: '4' },
  ];

  const FloorData = [
    { name: 'Floor', label: 'Ground Floor', value: '0' },
    { name: 'Floor', label: 'Floor 1', value: '1' },
    { name: 'Floor', label: 'Floor 2', value: '2' },
    { name: 'Floor', label: 'Floor 3', value: '3' },
  ];

  const DivisionData = [
    { name: 'Division', label: 'To order', value: '1' },
    { name: 'Division', label: 'Semidecom.', value: '2' },
    { name: 'Division', label: 'Non Separate', value: '3' },
    { name: 'Division', label: 'Circular', value: '4' },
    { name: 'Division', label: 'car', value: '5' },
  ];

  const ComfortData = [
    { name: 'Comfort', label: 'Comfort 1', value: '1' },
    { name: 'Comfort', label: 'Comfort 2', value: '2' },
    { name: 'Comfort', label: 'Comfort 3', value: '3' },
    { name: 'Comfort', label: 'Luxury', value: '4' },
  ];

  const numberOfBathRoomsData = [
    { name: 'Bathroom', label: 'a bath', value: '1' },
    { name: 'Bathroom', label: '2 bathrooms', value: '2' },
    { name: 'Bathroom', label: '3 bathrooms', value: '3' },
    { name: 'Bathroom', label: '4+ bathrooms', value: '4' },
  ];

  return (
    <React.Fragment>
    <div className='sidebar-filters-card'>
      <h6 className='filters__heading'>Filters</h6>

      <h6>Location</h6>
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        isDisabled={!countryList || countryList.length <= 0}
        name='colors'
        options={countryList}
        className='React'
        classNamePrefix='select'
        //  countryFilter(e)
        onChange={(e, index) => countryFilter(e)}
      />

      <hr />

      <h6>Transaction type</h6>
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        isDisabled={!TransactionTypeData || TransactionTypeData.length <= 0}
        name='colors'
        options={TransactionTypeData}
        //  countryFilter(e)
        onChange={(e, index) => setTransactionType(e, 'TransactionType')}
      />

      <hr />
      <div>
        <div>
          <h6>Property type</h6>
        </div>
        <div>
          <ul>
            {PropertyTypeData.map((property) => (
              <li>
                <select
                  defaultChecked={false}
                  name={property.name}
                  label={property.label}
                  value={property.value}
                  onChange={(e) => TranactionTypeHandle(e)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />

      <div>
        <div>
          <h6>Number of Rooms</h6>
        </div>
        <div>
          <ul>
            {RoomCountData.map((nor) => (
              <li>
                <input
                  name={nor.name}
                  label={nor.label}
                  value={nor.value}
                  onChange={(e) => TranactionTypeHandle(e)}
                  defaultChecked={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />
      <div>
        <div>
          <h6>Budget(EUR)</h6>
        </div>
        <input
          type='number'
          placeholder='Price min.'
          onBlur={(e) => setLimitValue(e, 'minPrice')}
        />
        <input
          type='number'
          placeholder='Price max.'
          onBlur={(e) => setLimitValue(e, 'maxPrice')}
        />
      </div>

      <hr />
      <div>
        <div>
          <h6 className='filter-title mb-0'>Old building</h6>
        </div>
        <input
          type='number'
          placeholder='In min.'
          onBlur={(e) => setLimitValue(e, 'minYearBuilt')}
        />
        <input
          type='number'
          placeholder='An max.'
          onBlur={(e) => setLimitValue(e, 'maxYearBuilt')}
        />
      </div>

      <hr />
      <div>
        <div>
          <h6>Floor</h6>
        </div>
        <div>
          <ul>
            {FloorData.map((floor) => (
              <li>
                <select
                  name={floor.name}
                  label={floor.label}
                  value={floor.value}
                  onChange={(e) => TranactionTypeHandle(e)}
                  defaultChecked={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <h6>
            Usable area(m<sup>2</sup>)
          </h6>
        </div>
        <input
          type='number'
          placeholder='In min.'
          onBlur={(e) => setLimitValue(e, 'minLivingArea')}
        />
        <input
          type='number'
          placeholder='An max.'
          onBlur={(e) => setLimitValue(e, 'maxLivingArea')}
        />
      </div>
      <hr />
      <div>
        <div>
          <h6>Partitioning</h6>
        </div>
        <div>
          <ul>
            {DivisionData.map((par) => (
              <li>
                <select
                  label='To Order'
                  name={par.name}
                  label={par.label}
                  value={par.value}
                  onChange={(e) => TranactionTypeHandle(e)}
                  defaultChecked={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <h6>Comfort</h6>
        </div>
        <div>
          <ul>
            {ComfortData.map((comfort) => (
              <li>
                <select
                  defaultChecked={false}
                  name={comfort.name}
                  label={comfort.label}
                  value={comfort.value}
                  onChange={(e) => TranactionTypeHandle(e)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <h6>Number of bathrooms</h6>
        </div>
        <div>
          <ul>
            {numberOfBathRoomsData.map((nob) => (
              <li>
                <select
                  name={nob.name}
                  label={nob.label}
                  value={nob.value}
                  onChange={(e) => TranactionTypeHandle(e)}
                  defaultChecked={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />

      <div>
        <Link to='/'>
          <button>CLEAR ALL FILTERS</button>
        </Link>
        </div>
    </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    argus: state.argusGeneral.apis,
  };
};
export default connect(mapStateToProps, { countryFetch })(ListingSidebar);
