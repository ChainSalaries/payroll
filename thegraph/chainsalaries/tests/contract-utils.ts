import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CompanyAdded,
  CompanyFunded,
  DaysWorkedUpdated,
  EmployeeAdded,
  EmployeeVerified,
  PayoutMade
} from "../generated/Contract/Contract"

export function createCompanyAddedEvent(
  companyAddress: Address,
  companyName: string
): CompanyAdded {
  let companyAddedEvent = changetype<CompanyAdded>(newMockEvent())

  companyAddedEvent.parameters = new Array()

  companyAddedEvent.parameters.push(
    new ethereum.EventParam(
      "companyAddress",
      ethereum.Value.fromAddress(companyAddress)
    )
  )
  companyAddedEvent.parameters.push(
    new ethereum.EventParam(
      "companyName",
      ethereum.Value.fromString(companyName)
    )
  )

  return companyAddedEvent
}

export function createCompanyFundedEvent(
  companyAddress: Address,
  amount: BigInt
): CompanyFunded {
  let companyFundedEvent = changetype<CompanyFunded>(newMockEvent())

  companyFundedEvent.parameters = new Array()

  companyFundedEvent.parameters.push(
    new ethereum.EventParam(
      "companyAddress",
      ethereum.Value.fromAddress(companyAddress)
    )
  )
  companyFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return companyFundedEvent
}

export function createDaysWorkedUpdatedEvent(
  employeeAddress: Address,
  daysWorked: BigInt
): DaysWorkedUpdated {
  let daysWorkedUpdatedEvent = changetype<DaysWorkedUpdated>(newMockEvent())

  daysWorkedUpdatedEvent.parameters = new Array()

  daysWorkedUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )
  daysWorkedUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "daysWorked",
      ethereum.Value.fromUnsignedBigInt(daysWorked)
    )
  )

  return daysWorkedUpdatedEvent
}

export function createEmployeeAddedEvent(
  employeeAddress: Address,
  companyAddress: Address,
  dailyWageWei: BigInt,
  activity: string
): EmployeeAdded {
  let employeeAddedEvent = changetype<EmployeeAdded>(newMockEvent())

  employeeAddedEvent.parameters = new Array()

  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "companyAddress",
      ethereum.Value.fromAddress(companyAddress)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "dailyWageWei",
      ethereum.Value.fromUnsignedBigInt(dailyWageWei)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam("activity", ethereum.Value.fromString(activity))
  )

  return employeeAddedEvent
}

export function createEmployeeVerifiedEvent(
  employeeAddress: Address
): EmployeeVerified {
  let employeeVerifiedEvent = changetype<EmployeeVerified>(newMockEvent())

  employeeVerifiedEvent.parameters = new Array()

  employeeVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )

  return employeeVerifiedEvent
}

export function createPayoutMadeEvent(
  employeeAddress: Address,
  amount: BigInt
): PayoutMade {
  let payoutMadeEvent = changetype<PayoutMade>(newMockEvent())

  payoutMadeEvent.parameters = new Array()

  payoutMadeEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )
  payoutMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return payoutMadeEvent
}
