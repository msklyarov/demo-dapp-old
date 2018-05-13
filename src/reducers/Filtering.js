import { FilteringConstants, initialState } from '../actions/Filtering'

export default function Filtering(state = initialState, action = { payload: {} }) {
  switch (action.type) {
    case FilteringConstants.GET_STATE:
      return { ...action.payload }

    case FilteringConstants.SET_STATE:
      return { ...state, ...action.payload }

    case FilteringConstants.RESET_STATE:
      return initialState

    default:
      return state
  }
}


