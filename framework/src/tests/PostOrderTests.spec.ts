import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Order } from "../models/Order.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Post Order", function () {

  let orderID: number;
  let shouldDeleteOrder = false;

    afterEach(async function () {
      if (shouldDeleteOrder) {
      await storeService.deleteOrder(orderID);
      }
    });
  
  it("@Smoke - Success case providing id", async function () {
    orderID = 6;
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.equal(200, JSON.stringify(orderResponse));
    orderResponse.id?.should.equal(order.id);
    orderResponse.petId?.should.equal(order.petId);
    orderResponse.quantity?.should.equal(order.quantity);
    orderResponse.status?.should.equal(order.status);
    orderResponse.complete?.should.equal(order.complete);
    const shipDate = new Date(orderResponse.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.equal(order.shipDate?.toLocaleDateString("en-CA"));
    shouldDeleteOrder = true;
  });

  it("@Smoke - Success case without providing id", async function () {
    const order: Order = {
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.equal(200, JSON.stringify(orderResponse));
    orderResponse.id?.should.be.a("number");
    orderResponse.petId?.should.equal(order.petId);
    orderResponse.quantity?.should.equal(order.quantity);
    orderResponse.status?.should.equal(order.status);
    orderResponse.complete?.should.equal(order.complete);
    const shipDate = new Date(orderResponse.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.equal(order.shipDate?.toLocaleDateString("en-CA"));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. petId must be mandatory but it's taking 0]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Missing petId", async function () {
    const order: Order = {
      id: orderID,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.not.equal(200, JSON.stringify(orderResponse));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. Quantity should only be = 1.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Missing quantity", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.not.equal(200, JSON.stringify(orderResponse));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. Invalid dates should return an error.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Invalid shipDate", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: 1,
      shipDate: new Date("Invalid Date"),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.not.equal(200, JSON.stringify(orderResponse));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. Status should be required.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Missing status", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.not.equal(200, JSON.stringify(orderResponse));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. Empty status should return an error.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Invalid status", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    response.status?.should.not.equal(200, JSON.stringify(orderResponse));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. It should not accept duplicated id, but it does and replaces it.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Duplicated id", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response1 = await storeService.postOrder(order);
    const response2 = await storeService.postOrder(order);
    const orderResponse1 = (response1.data) as Order;
    const orderResponse2 = (response2.data) as Order;
    response1.status?.should.equal(200, JSON.stringify(orderResponse1));
    response2.status?.should.not.equal(200, JSON.stringify(orderResponse2));
    shouldDeleteOrder = true;
  });

    //BUG: [TODO: create a bug and paste the link here. It should not create orders for a petId that was already ordered.]
    // eslint-disable-next-line ui-testing/no-disabled-tests
    it.skip("@Smoke - Duplicated petId", async function () {
      const order: Order = {
        id: orderID,
        petId: 1,
        quantity: 1,
        shipDate: new Date(),
        status: "placed",
        complete: false,
      };
      const response1 = await storeService.postOrder(order);
      const orderResponse1 = (response1.data) as Order;
      order.id = orderID + 1;
      const response2 = await storeService.postOrder(order);
      const orderResponse2 = (response2.data) as Order;
      response1.status?.should.equal(200, JSON.stringify(orderResponse1));
      response2.status?.should.not.equal(200, JSON.stringify(orderResponse2));
      shouldDeleteOrder = true;
    });
});
