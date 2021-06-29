import { REQUEST_STATUS, ACTION } from "../constants";

const requestReducer = (state, action) => {
  switch (action.type) {
    case ACTION.FETCH_LIST_SUCCESS: {
      return {
        ...state,
        list: action.list,
        status: REQUEST_STATUS.SUCCESS
      };
    }
    case ACTION.FETCH_LIST_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.ERROR,
        error: action.error
      };
    }
    case ACTION.UPDATE_SUCCESS:
      const { list } = state;
      const { payload } = action;
      const payloadIndex = list.map(item => item.id).indexOf(payload.id);
      return {
        ...state,
        list: [
          ...list.slice(0, payloadIndex),
          payload,
          ...list.slice(payloadIndex + 1)
        ]
      };
    case ACTION.UPDATE_FAILURE:
      return {
        ...state,
        status: REQUEST_STATUS.ERROR,
        error: action.error
      };
    default:
      return state;
  }
};
export default requestReducer;
