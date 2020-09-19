import axios from '../../axios';
import requests, { API_KEY } from '../../requests';

export async function fetchData({
  type = 'offersSearch',
  page = 1,
  PropertyID = '',
  County = '',
  TransactionType = '',
  PropertyType = '',
  RoomCount = '',
  Comfort = '',
  Division = '',
  Floor = '',
  //   Bathroom = '',
  LastPriceEur = '',
  YearBuilt = '',
  LivingArea = '',
}) {
  let URL = requests.offersSearch;
  switch (type) {
    case 'offerImages':
      URL = requests.offerImages;
      break;
    default:
      URL = requests.offersSearch;
      break;
  }
  const formData = new FormData();
  formData.append('ApiKey', API_KEY);
  formData.append('Page', page);
  formData.append('PropertyID', PropertyID);
  formData.append('County', County);
  formData.append('TransactionType', TransactionType);
  formData.append('PropertyType', PropertyType);
  formData.append('RoomCount', RoomCount);
  formData.append('Comfort', Comfort);
  formData.append('Division', Division);
  formData.append('Floor', Floor);
  formData.append('LastPriceEur', LastPriceEur);
  formData.append('YearBuilt', YearBuilt);
  formData.append('LivingArea', LivingArea);

  //   formData.append('Bathroom', Bathroom);

  // formData.append('County', DEFCountry);
  // formData.append('LastDate', '2020-05-08 00:00:00');

  const request = await axios.post(URL, formData);
  const data = request.data;
  if (data.status === 200) {
    return {
      status: data.status,
      properties: data.Data,
      paginations: {
        TotalCount: data.TotalCount,
        NextPage: data.NextPage,
        PageCount: data.PageCount,
        CurrentPage: data.CurrentPage,
      },
      propertyLoading: false,
    };
  }
  return {
    status: data.status,
    properties: [],
    paginations: {},
    propertyLoading: false,
  };
}
