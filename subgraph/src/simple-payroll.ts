import {
  CompanyAdded as CompanyAddedEvent,
  CompanyFunded as CompanyFundedEvent,
  DaysWorkedUpdated as DaysWorkedUpdatedEvent,
  EmployeeAdded as EmployeeAddedEvent,
  EmployeeVerified as EmployeeVerifiedEvent,
  PayoutMade as PayoutMadeEvent
} from "../generated/SimplePayroll/SimplePayroll"
import {
  CompanyAdded,
  CompanyFunded,
  DaysWorkedUpdated,
  EmployeeAdded,
  EmployeeVerified,
  PayoutMade
} from "../generated/schema"

export function handleCompanyAdded(event: CompanyAddedEvent): void {
  let entity = new CompanyAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.companyAddress = event.params.companyAddress
  entity.companyName = event.params.companyName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCompanyFunded(event: CompanyFundedEvent): void {
  let entity = new CompanyFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.companyAddress = event.params.companyAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDaysWorkedUpdated(event: DaysWorkedUpdatedEvent): void {
  let entity = new DaysWorkedUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress
  entity.daysWorked = event.params.daysWorked

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmployeeAdded(event: EmployeeAddedEvent): void {
  let entity = new EmployeeAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress
  entity.companyAddress = event.params.companyAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmployeeVerified(event: EmployeeVerifiedEvent): void {
  let entity = new EmployeeVerified(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayoutMade(event: PayoutMadeEvent): void {
  let entity = new PayoutMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
