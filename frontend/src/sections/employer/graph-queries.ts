import { gql } from '@apollo/client'

export const GET_EMPLOYEES = gql`
  query Employees($companyAddress: String!) {
    employeeAddeds(where: { companyAddress: $companyAddress }) {
      id
      activity
      employeeAddress
      companyAddress
      dailyWageWei
      blockTimestamp
    }
  }
`

export const ORG_ADDED = gql`
  query OrgAdded($address: Bytes!) {
    companyAddeds(where: { companyAddress: $address }) {
      id
      companyName
      companyAddress
      blockTimestamp
    }
  }
`

export const ORG_FUNDED = gql`
  query OrgFunded($address: Bytes!) {
    companyFunded(where: { companyAddress: $address }) {
      id
      companyAddress
      amount
      blockTimestamp
    }
  }
`
