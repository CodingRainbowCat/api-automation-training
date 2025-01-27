import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Order } from "../models/Order.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Post Order", function () {

  let orderID = 6;

    afterEach(async () => {
      await storeService.deleteOrder(orderID);
    });
  
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
