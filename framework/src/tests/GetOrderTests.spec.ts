import "dotenv/config";
import { StoreService } from "../base/StoreService.js";
import { Order } from "../models/Order.js";
import { should } from 'chai';
should();

const storeService = new StoreService();

describe("Get Order", function () {

    let orderID = 4;

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
  
  it("Success case", async function () {
    const response = await storeService.getOrder(orderID);
    const order = (response.data) as Order;
    response.status.should.equal(200, JSON.stringify(order));
    order.id?.should.equal(orderID);
  });
});