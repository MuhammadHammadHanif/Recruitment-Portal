import {
  VIEW_JOB,
  JOB_LOADING,
  GET_ALL_JOB,
  ALL_APPLIED_JOBS,
  CLEAR_ALL_JOBS
} from "../actions/types";

const initialState = {
  viewjob: null,
  loading: false,
  alljobs: null,
  appliedjobs: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ALL_JOBS:
      return {
        ...state,
        viewjob: null,
        loading: false,
        alljobs: null,
        appliedjobs: null
      };
    case JOB_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_JOB:
      return {
        ...state,
        alljobs: action.payload,
        loading: false
      };
    case ALL_APPLIED_JOBS:
      return {
        ...state,
        appliedjobs: action.payload,
        loading: false
      };
    case VIEW_JOB:
      return {
        ...state,
        viewjob: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
