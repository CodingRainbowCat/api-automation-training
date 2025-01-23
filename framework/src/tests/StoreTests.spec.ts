import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Order, Inventory, DeleteOrderResponse } from "../models/index.js";
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

describe("Post Order", function () {
  
  it("Success case", async function () {
    const order: Order = {
      id: 6,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: true,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.equal(200, JSON.stringify(orderResponse));
    orderResponse.id?.should.equal(order.id);
    orderResponse.petId?.should.equal(order.petId);
    orderResponse.quantity?.should.equal(order.quantity);
    orderResponse.status?.should.equal(order.status);
    orderResponse.complete?.should.equal(order.complete);
    orderResponse.shipDate?.getDay?.should.equal(order.shipDate?.getDay);
  });
});

describe("Get Order", function () {
  
  it("Success case", async function () {
    const orderID = 6;
    const response = await storeService.getOrder(orderID);
    const order = (response.data) as Order;
    response.status.should.equal(200, JSON.stringify(order));
    order.id?.should.equal(orderID);
  });
});

describe("Delete Order", function () {
  
  it("Success case", async function () {
    const orderID = 6;
    const response = await storeService.deleteOrder(orderID);
    const data = response.data as DeleteOrderResponse;
    response.status.should.equal(200, JSON.stringify(response.data));
    data.message?.should.equal(orderID.toString());
  });
});
