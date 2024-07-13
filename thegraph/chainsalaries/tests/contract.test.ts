import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { EmployeeAdded } from "../generated/schema"
import { EmployeeAdded as EmployeeAddedEvent } from "../generated/Contract/Contract"
import { handleEmployeeAdded } from "../src/contract"
import { createEmployeeAddedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let employeeAccount = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let companyAccount = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let dailySalaryWei = BigInt.fromI32(234)
    let activity = "Example string value"
    let startMoment = BigInt.fromI32(234)
    let newEmployeeAddedEvent = createEmployeeAddedEvent(
      employeeAccount,
      companyAccount,
      dailySalaryWei,
      activity,
      startMoment
    )
    handleEmployeeAdded(newEmployeeAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EmployeeAdded created and stored", () => {
    assert.entityCount("EmployeeAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EmployeeAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "employeeAccount",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EmployeeAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyAccount",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EmployeeAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dailySalaryWei",
      "234"
    )
    assert.fieldEquals(
      "EmployeeAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "activity",
      "Example string value"
    )
    assert.fieldEquals(
      "EmployeeAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startMoment",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
