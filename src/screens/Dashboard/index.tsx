import { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import OrderContext from "../../components/Context";
import OrderCard from "../../components/OrderCard";
import { order } from "../../models/Order.models";
import Api from "../../services/Api";
import * as S from "./styles";

export type props = {
  isRefreshing: boolean;
};

const Dashboard = (props: props) => {
  const [order, setOrder] = useState<order[]>([]);
  const { update, setUpdate } = useContext(OrderContext);

  const getCostumer = async () => {
    const { data } = await Api.get("/order");
    setOrder(data);
  };

  useEffect(() => {
    if (update) {
      getCostumer();
      setUpdate(false);
    }
  }, [update]);

  return (
    <S.Container
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <S.Text>Conferência de mercadorias</S.Text>
      <S.Content>
        <FlatList
          contentContainerStyle={{
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          numColumns={2}
          data={order}
          keyExtractor={(item) => item.cliente}
          renderItem={({ item }) => (
            <OrderCard
              orderId={item.idpedido}
              orderName={item.cliente}
              orderNumber={item.numnota}
              orderStatus={item.status}
            />
          )}
        />
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
