import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Order } from "../models/Order.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Post Order", function () {

  const orderId = 6;
  let shouldDeleteOrder = false;

    afterEach(async function () {
      if (shouldDeleteOrder) {
      await storeService.deleteOrder(orderId);
      }
    });
  
  it("@Smoke - Success case providing id", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const postOrderResponse = await storeService.postOrder(order);
    postOrderResponse.status?.should.equal(200, JSON.stringify(postOrderResponse.data));
    const getOrderResponse = await storeService.getOrder(orderId);
    const responseOrder = (getOrderResponse.data) as Order;
    responseOrder.id?.should.equal(order.id);
    responseOrder.petId?.should.equal(order.petId);
    responseOrder.quantity?.should.equal(order.quantity);
    responseOrder.status?.should.equal(order.status);
    responseOrder.complete?.should.equal(order.complete);
    const shipDate = new Date(responseOrder.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.equal(order.shipDate?.toLocaleDateString("en-CA"));
    shouldDeleteOrder = true;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. The order is not actually being created when an ID is not provided.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Success case without providing id", async function () {
    const order: Order = {
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const postOrderResponse = await storeService.postOrder(order);
    postOrderResponse.status?.should.equal(200, JSON.stringify(postOrderResponse.data));
    const getOrderResponse = await storeService.getOrder(postOrderResponse.data.id ?? 0);
    getOrderResponse.status?.should.equal(200, JSON.stringify(getOrderResponse.data));
    const responseOrder = (getOrderResponse.data) as Order;
    responseOrder.id?.should.be.a("number");
    responseOrder.petId?.should.equal(order.petId);
    responseOrder.quantity?.should.equal(order.quantity);
    responseOrder.status?.should.equal(order.status);
    responseOrder.complete?.should.equal(order.complete);
    const shipDate = new Date(responseOrder.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.equal(order.shipDate?.toLocaleDateString("en-CA"));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. petId must be mandatory but it's taking 0.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Missing petId", async function () {
    const order: Order = {
      id: orderId,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Quantity should only be = 1, and it's added with 0 when no quantity is provided.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Missing quantity", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.data.quantity?.should.equal(1, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

it("@Smoke - Invalid shipDate", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date("Invalid Date"),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.data.shipDate?.should.be.a("undefined", JSON.stringify(response.data));
    shouldDeleteOrder = true;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Status should be required but the order is created without it.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Missing status", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Empty status should return an error, but it's created with value "".
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Invalid status", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. It should not accept duplicated id, but it does and replaces the old order.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Duplicated id", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response1 = await storeService.postOrder(order);
    const response2 = await storeService.postOrder(order);
    response1.status?.should.equal(200, JSON.stringify(response1.data));
    response2.status?.should.not.equal(409, JSON.stringify(response2.data));
    shouldDeleteOrder = true;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. It should not create orders for a petId that was already ordered.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Smoke - Duplicated petId", async function () {
      const order: Order = {
        id: orderId,
        petId: 1,
        quantity: 1,
        shipDate: new Date(),
        status: "placed",
        complete: false,
      };
      const response1 = await storeService.postOrder(order);
      order.id = orderId + 1;
      const response2 = await storeService.postOrder(order);
      response1.status?.should.equal(200, JSON.stringify(response1.data));
      response2.status?.should.not.equal(409, JSON.stringify(response2.data));
      shouldDeleteOrder = true;
  });

  it("@Regression - Invalid data type for id", async function () {
    const order = {
      id: "Cat",
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const orderResponse = (response.data) as Order;
    orderResponse.id?.should.be.above(0, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Invalid types should return 400.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid data type for petId", async function () {
    const order = {
      id: orderId,
      petId: "Cat",
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Invalid types should return 400.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid data type for quantity", async function () {
    const order = {
      id: orderId,
      petId: 1,
      quantity: "Cat",
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Invalid types should return 400, not 500, or ignore the field as in other cases.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid data type for shipDate", async function () {
    const order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: "Cat",
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Invalid types should return 400.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid data type for complete", async function () {
    const order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: "Cat",
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
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
      orderResponse.id?.should.be.above(0, JSON.stringify(orderResponse));
      shouldDeleteOrder = false;
  });
    
  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Negative values should not be accepted for petIds.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Negative petId", async function () {
    const order: Order = {
      id: orderId,
      petId: -1,
      quantity: 1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Negative values should not be accepted for quantity.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Negative quantity", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: -1,
      shipDate: new Date(),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    response.status?.should.equal(400, JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Quantity should only be = 1.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid quantity", async function () {
    const order: Order = {
      id: orderId,
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

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Year can not be 0000. It should return an error or create the order without shipDate as in other cases
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - shipDate out of range (year)", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date("0000-01-01"),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const shipDate = new Date(response.data.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.not.equal("Invalid Date", JSON.stringify(response.data));
    shouldDeleteOrder = false;
  });

  it("@Regression - shipDate with wrong leap year date", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date("2025-02-29"),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const shipDate = new Date(response.data.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.not.equal("2025-02-29", JSON.stringify(response.data));
    shouldDeleteOrder = true;
  });

  // BUG: https://github.com/CodingRainbowCat/api-automation-training/issues/4. Leap year date should be accepted.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - shipDate with right leap year date", async function () {
    const order: Order = {
      id: orderId,
      petId: 1,
      quantity: 1,
      shipDate: new Date("2024-02-29"),
      status: "placed",
      complete: false,
    };
    const response = await storeService.postOrder(order);
    const shipDate = new Date(response.data.shipDate ?? "");
    shipDate.toLocaleDateString("en-CA").should.equal("2024-02-29", JSON.stringify(response.data));
    shouldDeleteOrder = true;
  });
});
