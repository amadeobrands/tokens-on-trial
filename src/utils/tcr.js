import * as tcrConstants from '../constants/tcr'

export const hasPendingRequest = ({ status, clientStatus, latestRequest }) => {
  if (clientStatus === tcrConstants.STATUS_ENUM.Pending) return true
  if (latestRequest && latestRequest.disputed && !latestRequest.resolved)
    return true
  switch (status) {
    case tcrConstants.IN_CONTRACT_STATUS_ENUM['RegistrationRequested']:
    case tcrConstants.IN_CONTRACT_STATUS_ENUM['ClearingRequested']:
      return true
    default:
      break
  }

  return false
}

export const isRegistrationRequest = tokenStatus =>
  tokenStatus === tcrConstants.IN_CONTRACT_STATUS_ENUM['RegistrationRequested']

export const contractStatusToClientStatus = (status, disputed) => {
  if (disputed)
    switch (tcrConstants.IN_CONTRACT_STATUS_ENUM[status]) {
      case 'RegistrationRequested':
        return tcrConstants.STATUS_ENUM['Registration Request Challenged']
      case 'ClearingRequested':
        return tcrConstants.STATUS_ENUM['Clearing Request Challenged']
      default:
        return status
    }

  return status
}

export const getBlock = (block, web3, hash, callback) => {
  if (!block || !block.timestamp)
    // Due to a web3js this method sometimes returns a null block https://github.com/paritytech/parity-ethereum/issues/8788.
    web3.eth.getBlock(hash, (err, block) => {
      if (err) throw err
      getBlock(block, web3, hash, callback)
    })
  else callback(block)
}

// Converts token string data to correct js types.
export const convertFromString = token => {
  const { latestRequest } = token
  latestRequest.submissionTime = Number(latestRequest.submissionTime) * 1000
  latestRequest.challengerDepositTime =
    Number(latestRequest.challengerDepositTime) * 1000
  latestRequest.numberOfRounds = Number(latestRequest.numberOfRounds)
  latestRequest.disputeID = Number(latestRequest.disputeID)

  const { latestRound } = latestRequest
  latestRound.ruling = Number(latestRound.ruling)
  latestRound.paidFees[0] = Number(latestRound.paidFees[0])
  latestRound.paidFees[1] = Number(latestRound.paidFees[1])
  latestRound.paidFees[2] = Number(latestRound.paidFees[2])
  latestRound.requiredForSide[0] = Number(latestRound.requiredForSide[0])
  latestRound.requiredForSide[1] = Number(latestRound.requiredForSide[1])
  latestRound.requiredForSide[2] = Number(latestRound.paidFees[2])
  token.latestRound = latestRound
  return token
}
