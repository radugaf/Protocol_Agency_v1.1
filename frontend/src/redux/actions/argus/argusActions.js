import axios from "../../../axios";

import requests, { API_KEY } from "../../../requests";

export const countryFetch = () => {
  return async (dispatch) => {
    const data = await fetchData(1);
    dispatch({ type: "FETCH_COUNTRY", datas: data });
  };
};

async function fetchData(page = 1) {
  const countryData = [];
  let currentPage = page;
  let totalPage = 2;
  do {
    const formData = new FormData();
    formData.append("ApiKey", API_KEY);
    formData.append("Page", currentPage);
    const requestdata = await axios.post(requests.counties, formData);
    const data = requestdata.data;
    if (data.status === 200) {
      countryData.push(...data.Data);
      totalPage = data.PageCount;
    }
    currentPage += 1;
  } while (totalPage >= currentPage);
  return countryData;
}
