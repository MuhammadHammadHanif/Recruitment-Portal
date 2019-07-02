import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_STUDENTS,
  VIEW_PROFILE,
  CLEAR_VIEW_PROFILE,
  GET_COMPANIES,
  GET_NOTIFICATION
} from "../actions/types";

const initialState = {
  profile: null,
  viewprofile: null,
  allstudents: null,
  loading: false,
  allcompanies: null,
  notifications: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
        loading: false
      };
    case VIEW_PROFILE:
      return {
        ...state,
        viewprofile: action.payload,
        loading: false
      };
    case GET_STUDENTS:
      return {
        ...state,
        allstudents: action.payload,
        loading: false
      };
    case GET_COMPANIES:
      return {
        ...state,
        allcompanies: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        viewprofile: null,
        allstudents: null,
        loading: false,
        allcompanies: null,
        notifications: null
      };
    case CLEAR_VIEW_PROFILE:
      return {
        ...state,
        viewprofile: null
      };
    default:
      return state;
  }
}
