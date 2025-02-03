import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Order } from "../models/Order.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Get Order", function () {

    const orderID = 4;

    before(async function () {
        const beforeOrder: Order = {
            id: orderID,
            petId: 1,
            quantity: 1,
            shipDate: new Date(),
            status: "placed",
            complete: true,
          };
        await storeService.postOrder(beforeOrder);
      });
    
      after(async () => {
        await storeService.deleteOrder(orderID);
      });
  
  it("@Smoke - Success case", async function () {
    const response = await storeService.getOrder(orderID);
    const order = (response.data) as Order;
    response.status.should.equal(200, JSON.stringify(order));
    order.id?.should.equal(orderID);
  });

  it("@Smoke - Unexisting order", async function () {
    await storeService.deleteOrder(6);
    const response = await storeService.getOrder(6);
    response.status.should.equal(404, JSON.stringify(response.data));
  });

  // BUG: The API should return 400 instead of 404 when the provided ID is negative.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Negative ID", async function () {
    const response = await storeService.getOrder(-1);
    response.status.should.equal(400, JSON.stringify(response.data));
  });

  // BUG: The API should return 400 when id is out of range, but instead it returns 200 showing the order with the last ID possible. 
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("ID out of range", async function (){
    const id = 9223372016900018001n;
    const response = await storeService.getOrder(id.toString());
    const order = (response.data) as Order;
    console.log(order);
    response.status.should.equal(400, JSON.stringify(order));
  });

  // BUG: The API should return 400 instead of 404 when the ID has an invalid type.
  // eslint-disable-next-line ui-testing/no-disabled-tests
  it.skip("@Regression - Invalid id type", async function () {
    const id = false;
    const response = await storeService.getOrder(id);
    console.log(response.data);
    response.status.should.equal(400, JSON.stringify(response.data));
  });
});