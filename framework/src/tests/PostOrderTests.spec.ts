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
    response.status?.should.not.equal(200, JSON.stringify(response.data));
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
    response.status?.should.not.equal(200, JSON.stringify(response.data));
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
    response.status?.should.not.equal(200, JSON.stringify(response.data));
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
    response.status?.should.not.equal(200, JSON.stringify(response.data));
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
    response.status?.should.not.equal(200, JSON.stringify(response.data));
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
    response1.status?.should.equal(200, JSON.stringify(response1.data));
    response2.status?.should.not.equal(200, JSON.stringify(response2.data));
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
      order.id = orderID + 1;
      const response2 = await storeService.postOrder(order);
      response1.status?.should.equal(200, JSON.stringify(response1.data));
      response2.status?.should.not.equal(200, JSON.stringify(response2.data));
      shouldDeleteOrder = true;
  });

  it("@Regression - Invalid data type for id", async function () {
    const order = {
      id: false,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    orderResponse.id?.should.be.above(0);
    shouldDeleteOrder = false;
  });

  it("@Regression - Invalid data type for petId", async function () {
    const order = {
      id: orderID,
      petId: "Cat",
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(500, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  it("@Regression - Negative id", async function () {
      const order: Order = {
        id: -1,
        petId: 1,
        quantity: 1,
        shipDate: new Date(),
        status: "placed",
        complete: false,
      };
      const response = await storeService.postOrder(order);
      const orderResponse = (response.data) as Order;
      orderResponse.id?.should.be.above(0);
      shouldDeleteOrder = false;
  });
    
  //BUG: [TODO: create a bug and paste the link here. Negative values should not be accepted for petIs.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Negative petId", async function () {
    const order: Order = {
      id: orderID,
      petId: -1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.not.equal(200, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. Negative values should not be accepted for quantity.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Negative quantity", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: -1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.not.equal(200, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  //BUG: [TODO: create a bug and paste the link here. Quantity should only be = 1.]
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid quantity", async function () {
    const order: Order = {
      id: orderID,
      petId: 1,
      quantity: 4,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.not.equal(200, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });
});
