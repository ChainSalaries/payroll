import {
  EmployeeAdded as EmployeeAddedEvent,
  EmployeePaid as EmployeePaidEvent,
  EmployeeVerified as EmployeeVerifiedEvent,
  LatestPayReceivedSetBack as LatestPayReceivedSetBackEvent,
  OrganizationAdded as OrganizationAddedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TreasuryFunded as TreasuryFundedEvent
} from "../generated/Contract/Contract"
import {
  EmployeeAdded,
  EmployeePaid,
  EmployeeVerified,
  LatestPayReceivedSetBack,
  OrganizationAdded,
  OwnershipTransferred,
  TreasuryFunded
} from "../generated/schema"

export function handleEmployeeAdded(event: EmployeeAddedEvent): void {
  let entity = new EmployeeAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAccount = event.params.employeeAccount
  entity.companyAccount = event.params.companyAccount
  entity.dailySalaryWei = event.params.dailySalaryWei
  entity.activity = event.params.activity
  entity.startMoment = event.params.startMoment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmployeePaid(event: EmployeePaidEvent): void {
  let entity = new EmployeePaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAccount = event.params.employeeAccount
  entity.amount = event.params.amount
  entity.latestPayReceived = event.params.latestPayReceived

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmployeeVerified(event: EmployeeVerifiedEvent): void {
  let entity = new EmployeeVerified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAccount = event.params.employeeAccount
  entity.companyAccount = event.params.companyAccount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLatestPayReceivedSetBack(
  event: LatestPayReceivedSetBackEvent
): void {
  let entity = new LatestPayReceivedSetBack(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAccount = event.params.employeeAccount
  entity.hoursBack = event.params.hoursBack

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrganizationAdded(event: OrganizationAddedEvent): void {
  let entity = new OrganizationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orgId = event.params.orgId
  entity.orgAddress = event.params.orgAddress
  entity.orgName = event.params.orgName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTreasuryFunded(event: TreasuryFundedEvent): void {
  let entity = new TreasuryFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orgId = event.params.orgId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
