import { Select } from "components/Select";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStores } from "stores/RootStore";

const ProductsPage = observer(() => {
  const { checkoutStore } = useStores();

  useEffect(() => {
    checkoutStore.getMenu();
  }, [checkoutStore]);

  return (
    <div
      className="w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
      id="chec-div"
    >
      <div
        className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
        id="checkout"
      >
        <div
          className="flex items-end lg:flex-row flex-col justify-end"
          id="cart"
        >
          <div
            className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-screen h-auto"
            id="scroll"
          >
            <p className="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">
              DNV Imatis Health-care Services Pricing
            </p>
            {checkoutStore &&
              checkoutStore.items.map((item) => (
                <div
                  id={item.product.id}
                  key={item.id}
                  className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
                >
                  <div className="md:w-4/12 2xl:w-1/4 w-full">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full object-center object-cover md:block"
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">
                      Package
                    </p>
                    <div className="flex items-center justify-between w-full pt-1">
                      <p className="text-base font-black leading-none text-gray-800 dark:text-white">
                        {item.product.name}
                      </p>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex itemms-center">
                        <div className="flex flex-row h-10 w-32 rounded-lg relative bg-transparent mt-1">
                          <button
                            id={`minus-${item.product.id}`}
                            data-action="decrement"
                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                            onClick={() =>
                              checkoutStore.minusFromCart(item.product)
                            }
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input
                            id={`value-${item.product.id}`}
                            type="number"
                            className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                            name="custom-input-number"
                            onChange={() => {}}
                            value={item.quantity}
                          ></input>
                          <button
                            id={`add-${item.product.id}`}
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                            onClick={() =>
                              checkoutStore.addToCart(item.product)
                            }
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                      <p
                        id={`price-for-${item.product.id}`}
                        className="text-base font-black leading-none text-gray-800 dark:text-white"
                      >
                        {`${item.product.currency} ${item.product.retailPrice}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
              <div>
                <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">
                  Summary
                </p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    Subtotal
                  </p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    USD {checkoutStore.totalAmount().toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    Total Discount
                  </p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    USD{" "}
                    {(
                      checkoutStore.finalAmount() - checkoutStore.totalAmount()
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    Discount for customer
                  </p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">
                    {checkoutStore.currentCustomer?.name}
                  </p>
                </div>
              </div>
              <div>
                {checkoutStore.customers && (
                  <Select
                    label="Select customer"
                    options={checkoutStore.customers as any}
                    selectedOption={
                      (checkoutStore.currentCustomer as any) ||
                      checkoutStore.customers[0]
                    }
                    onChange={checkoutStore.setCurrentCustomer}
                  ></Select>
                )}
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                  <p className="text-2xl leading-normal text-gray-800 dark:text-white">
                    Total
                  </p>
                  <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">
                    USD {checkoutStore.finalAmount().toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => {}}
                  className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductsPage;
