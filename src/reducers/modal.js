import PropTypes from 'prop-types'
import createReducer from 'lessdux'

import * as modalActions from '../actions/modal'
import * as modalConstants from '../constants/modal'

// Shapes
const openTokenModalShape = PropTypes.oneOf(
  modalConstants.TOKEN_MODAL_ENUM.indexes
)
export { openTokenModalShape }

// Reducer
export default createReducer(
  {
    openTokenModal: null,
    isNotificationsModalOpen: false,
    isSettingsModalOpen: false
  },
  {
    [modalActions.OPEN_TOKEN_MODAL]: (state, { payload: { tokenModal } }) => ({
      ...state,
      openTokenModal: tokenModal
    }),
    [modalActions.CLOSE_TOKEN_MODAL]: state => ({
      ...state,
      openTokenModal: null
    }),
    [modalActions.OPEN_NOTIFICATIONS_MODAL]: state => ({
      ...state,
      isNotificationsModalOpen: true
    }),
    [modalActions.CLOSE_NOTIFICATIONS_MODAL]: state => ({
      ...state,
      isNotificationsModalOpen: false
    }),
    [modalActions.OPEN_SETTINGS_MODAL]: state => ({
      ...state,
      isSettingsModalOpen: true
    }),
    [modalActions.CLOSE_SETTINGS_MODAL]: state => ({
      ...state,
      isSettingsModalOpen: false
    })
  }
)
