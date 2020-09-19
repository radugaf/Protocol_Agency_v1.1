const initialState = {
  CountryData: [],
  CityData: [],
  User: {},
};

export const apis = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COUNTRY": {
      return { ...state, CountryData: action.datas };
    }
    case "FETCH_CITY": {
      return { ...state, values: action.payload };
    }
    case "ADD_USER": {
      return {
        ...state,
        User: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
