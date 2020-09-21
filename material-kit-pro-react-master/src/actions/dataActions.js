import axios from 'src/utils/axios';
import authService from 'src/services/authService';
import { DayBgRow } from '@fullcalendar/daygrid';

export const DATA_REQUEST = '@data/data-request';
export const DATA_SUCCESS = '@data/data-success';
export const DATA_FAILURE = '@data/data-failure';

export function fetchLast14Days(ticker) {
  return dispatch => {
    dispatch({ type: DATA_REQUEST });
    var request = require('request');

    var options = {
      method: 'GET',
      url:
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
      qs: { region: 'US', symbol: ticker },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': '7a97c40ce6msh8fdc5d34c7aa724p13af31jsn2f1a5a61773b',
        useQueryString: true
      }
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      // data comes back as a string in this api so turn to JSON
      const data = JSON.parse(body);

      const list = data.prices.slice(0, 14);
      const last14Days = list.map(element => {
        var myDate = new Date(element.date * 1000);
        const date = myDate.toDateString();
        const node = {
          ticker: ticker,
          date: date,
          open: element.open.toFixed(2),
          close: element.close.toFixed(2)
        };
        return node;
      });
      // triggers reducer which changes global state chich will update front end
      dispatch({ type: DATA_SUCCESS, payload: last14Days });
    });
  };
}
