import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Inventory } from "../models/Inventory.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Get Inventory", function () {

  it("Success case", async function () {
    const response = await storeService.getInventory();
    const inventory = (response.data) as Inventory;
    response.status.should.equal(200, JSON.stringify(inventory));
    inventory.available?.should.be.a("number");
  });
});