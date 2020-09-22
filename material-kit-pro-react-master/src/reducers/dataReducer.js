import {
  DATA_FAILURE,
  DATA_SUCCESS,
  DATA_REQUEST
} from 'src/actions/dataActions';

const initialState = {
  isLoading: false,
  // last 14 days of data
  items: [],
  isLoaded: false
};

// changes state based on the action which we dispatch
export const dataReducer = (state = initialState, action) => {
  // check for the action that was dispatched
  switch (action.type) {
    case DATA_REQUEST: {
      return { ...state, isLoading: true };
    }

    case DATA_SUCCESS: {
      return { isLoading: false, items: action.payload, isLoaded: true };
    }

    default:
      return state;
  }
};
