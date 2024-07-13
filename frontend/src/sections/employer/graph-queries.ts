import { gql } from '@apollo/client'

export const GET_EMPLOYEES = gql`
  query Employees($companyAccount: String!) {
    employeeAddeds(where: { companyAccount: $companyAccount }) {
      id
      activity
      startMoment
      employeeAccount
      companyAccount
      dailySalaryWei
      blockTimestamp
    }
  }
`

export const ORG_ADDED = gql`
  query OrgAdded($orgId: Int!) {
    organizationAddeds(where: { orgId: $orgId }) {
      id
      orgId
      orgName
      orgAddress
      blockTimestamp
    }
  }
`

export const ORG_FUNDED = gql`
  query OrgFunded($orgId: Int!) {
    treasuryFundeds(where: { orgId: $orgId }) {
      id
      orgId
      amount
      blockTimestamp
    }
  }
`
