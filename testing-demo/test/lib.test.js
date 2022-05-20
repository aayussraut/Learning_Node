const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");


//Testing numbers
describe("absolute", () => {
  // "describe" group of tests
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should return a negative number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
// test ('absolute - should return a postive number if input is positive',()=>{
//     const result=lib.absolute(1);
//     expect(result).toBe(1);
// })

// test ('absolute - should return a negative number if input is positive',()=>{
//     const result=lib.absolute(-1);
//     expect(result).toBe(1);
// })

// test ('absolute - should return a 0  if input is 0',()=>{
//     const result=lib.absolute(0);
//     expect(result).toBe(0);
// })

//Testing string
describe("greet", () => {
  it("should return gretting message", () => {
    const result = lib.greet("jane");
    // expect(result).toBe('Welcome jane'); //its specific to this test
    // expect(result).toMatch(/jane/);
    expect(result).toContain("jane");
  });
});

//Testing array
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");

    expect(result).toHaveLength(3);

    //Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    //Ideal way
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
    expect(result).toHaveLength(3);
  });
});

//Testing Object
describe("getProduct", () => {
  it("shoulld return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 }); //TtoEqaul checks the value to be equal and doesnt depend on the memory location
    expect(result).toMatchObject({ id: 1, price: 10 }); //toEqaul ma chai properties add garyo bhane fail hunxa so use this
    expect(result).toHaveProperty("id", 1); //dont care about other property but id
  });
});

//Testing exceptions
describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    //falsy :  Null undefined NaN "" 0 false

    const args = [null, undefined, NaN, 0, "", false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("jane");
    expect(result).toMatchObject({ username: "jane" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should give 10% discount if the point is greater than 10", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading from database...");
      return { id: customerId, points: 11 };
    };

    const order = { customerId: 1, totalPrice: 10 };

    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  // db.getCustomerSync = function (customerId) {
  //   return { email: "aaaa" };
  // };

  // let mailSent = false;
  // mail.send = function (email, message) {
  //   mailSent = true;
  // };

 
  // lib.notifyCustomer(order);

  // expect(mailSent).toBe(true);


  //Jest Mock FUnction approach

  db.getCustomerSync=jest.fn().mockReturnValue({email:"aaaa"});
  mail.send=jest.fn();
  const order = { customerId: 1 };
  lib.notifyCustomer(order);
  expect(mail.send).toHaveBeenCalled();

  expect(mail.send.mock.calls[0][0]).toBe('aaaa'); //check 1st parameter
  expect(mail.send.mock.calls[0][1]).toMatch(/order/); //check 1st parameter
});
