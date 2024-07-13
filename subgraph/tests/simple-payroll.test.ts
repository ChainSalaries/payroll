import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CompanyAdded } from "../generated/schema"
import { CompanyAdded as CompanyAddedEvent } from "../generated/SimplePayroll/SimplePayroll"
import { handleCompanyAdded } from "../src/simple-payroll"
import { createCompanyAddedEvent } from "./simple-payroll-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let companyAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let companyName = "Example string value"
    let newCompanyAddedEvent = createCompanyAddedEvent(
      companyAddress,
      companyName
    )
    handleCompanyAdded(newCompanyAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CompanyAdded created and stored", () => {
    assert.entityCount("CompanyAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CompanyAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CompanyAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyName",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
