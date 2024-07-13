import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EmployeeAdded,
  EmployeePaid,
  EmployeeVerified,
  LatestPayReceivedSetBack,
  OrganizationAdded,
  OwnershipTransferred,
  TreasuryFunded
} from "../generated/Contract/Contract"

export function createEmployeeAddedEvent(
  employeeAccount: Address,
  companyAccount: Address,
  dailySalaryWei: BigInt,
  activity: string,
  startMoment: BigInt
): EmployeeAdded {
  let employeeAddedEvent = changetype<EmployeeAdded>(newMockEvent())

  employeeAddedEvent.parameters = new Array()

  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAccount",
      ethereum.Value.fromAddress(employeeAccount)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "companyAccount",
      ethereum.Value.fromAddress(companyAccount)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "dailySalaryWei",
      ethereum.Value.fromUnsignedBigInt(dailySalaryWei)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam("activity", ethereum.Value.fromString(activity))
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "startMoment",
      ethereum.Value.fromUnsignedBigInt(startMoment)
    )
  )

  return employeeAddedEvent
}

export function createEmployeePaidEvent(
  employeeAccount: Address,
  amount: BigInt,
  latestPayReceived: BigInt
): EmployeePaid {
  let employeePaidEvent = changetype<EmployeePaid>(newMockEvent())

  employeePaidEvent.parameters = new Array()

  employeePaidEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAccount",
      ethereum.Value.fromAddress(employeeAccount)
    )
  )
  employeePaidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  employeePaidEvent.parameters.push(
    new ethereum.EventParam(
      "latestPayReceived",
      ethereum.Value.fromUnsignedBigInt(latestPayReceived)
    )
  )

  return employeePaidEvent
}

export function createEmployeeVerifiedEvent(
  employeeAccount: Address,
  companyAccount: Address
): EmployeeVerified {
  let employeeVerifiedEvent = changetype<EmployeeVerified>(newMockEvent())

  employeeVerifiedEvent.parameters = new Array()

  employeeVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAccount",
      ethereum.Value.fromAddress(employeeAccount)
    )
  )
  employeeVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "companyAccount",
      ethereum.Value.fromAddress(companyAccount)
    )
  )

  return employeeVerifiedEvent
}

export function createLatestPayReceivedSetBackEvent(
  employeeAccount: Address,
  hoursBack: BigInt
): LatestPayReceivedSetBack {
  let latestPayReceivedSetBackEvent = changetype<LatestPayReceivedSetBack>(
    newMockEvent()
  )

  latestPayReceivedSetBackEvent.parameters = new Array()

  latestPayReceivedSetBackEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAccount",
      ethereum.Value.fromAddress(employeeAccount)
    )
  )
  latestPayReceivedSetBackEvent.parameters.push(
    new ethereum.EventParam(
      "hoursBack",
      ethereum.Value.fromUnsignedBigInt(hoursBack)
    )
  )

  return latestPayReceivedSetBackEvent
}

export function createOrganizationAddedEvent(
  orgId: BigInt,
  orgAddress: Address,
  orgName: string
): OrganizationAdded {
  let organizationAddedEvent = changetype<OrganizationAdded>(newMockEvent())

  organizationAddedEvent.parameters = new Array()

  organizationAddedEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromUnsignedBigInt(orgId))
  )
  organizationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "orgAddress",
      ethereum.Value.fromAddress(orgAddress)
    )
  )
  organizationAddedEvent.parameters.push(
    new ethereum.EventParam("orgName", ethereum.Value.fromString(orgName))
  )

  return organizationAddedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTreasuryFundedEvent(
  orgId: BigInt,
  amount: BigInt
): TreasuryFunded {
  let treasuryFundedEvent = changetype<TreasuryFunded>(newMockEvent())

  treasuryFundedEvent.parameters = new Array()

  treasuryFundedEvent.parameters.push(
    new ethereum.EventParam("orgId", ethereum.Value.fromUnsignedBigInt(orgId))
  )
  treasuryFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return treasuryFundedEvent
}
