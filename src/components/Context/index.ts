import React from "react";

const OrderContext = React.createContext<{
  update: boolean | false;
  setUpdate: (newValue: boolean) => void;
}>({
  update: true,
  setUpdate: () => undefined,
});

export default OrderContext;
