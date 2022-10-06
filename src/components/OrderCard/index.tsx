import { useContext, useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

import {
  ButtonGreen,
  ButtonRed,
  ButtonText,
  ModalButtons,
  ModalContainer,
  ModalContent,
  ModalHeading,
  ModalOverlay,
} from "../ModalStyles";

import CheckIcon from "../Icons/CheckIcon";
import ImageIcon from "../Icons/ImageIcon";
import LupaIcon from "../Icons/LupaIcon";

import * as S from "./styles";
import { updateOrderDown, updateOrderStatus } from "../../services/OrderData";
import OrderContext from "../Context";

export type VariantTypes = "green" | "yellow" | "red";

export type OptionButtonProps = {
  top?: boolean;
  bottom?: boolean;
};

export type OrderCardProps = {
  orderId: number;
  orderName: string;
  orderNumber: number;
  orderStatus: string;
  variant?: VariantTypes;
  orderImage: string;
};

const getCardInfo = () => {
  let list = localStorage.getItem('infoCard');

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

const OrderCard = ({
  orderId,
  orderName,
  orderNumber,
  orderStatus,
  orderImage
}: OrderCardProps) => {
  // essa variant é pra mudar o card visualmente, mas o status e outras infos tem que vir do back
  const [variant, setVariant] = useState<VariantTypes>("red");
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState("");
  const [gps, setGps] = useState<LocationObject>();
  const { setUpdate } = useContext(OrderContext);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const cameraRef = useRef<Camera>(null);
  const [items, setItems] = useState(getCardInfo());

  useEffect(() => {
    localStorage.setItem('infoCard', JSON.stringify(items))
  }, [items]);

  // fazer o uso da imagem
  console.log(image);

  // fazer o uso do gps
  console.log(gps);

  async function handlePickImage() {
    const { status } = await Camera.requestCameraPermissionsAsync();

    console.log(status);

    if (status === "granted") {
      setIsCameraOpen(true);
    } else if (status === null || "undetermined") {
      return <View />;
    } else if (status === "denied") {
      return <Text>Sem acesso à câmera</Text>;
    }
  }

  async function handleGetGPS() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({});
      setGps(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }
  }

  const infoCard = {
    orderId,
    orderName,
    orderNumber,
    orderStatus,
    orderImage
  };

  function updateCard() {
    if (variant === "red") {
      setIsOpen(true);
    }
    if (variant === "yellow") {
      handleGetGPS();
      handlePickImage();
    }
  }

  async function takePhoto() {
    if (cameraRef) {
      try {
        const photo = await cameraRef!.current!.takePictureAsync({
          quality: 1,
        });

        console.log(photo.uri);

        if (photo) {
          setIsCameraOpen(false);
          setImage(photo.uri);
          setOrderDown();
          setVariant("green");
          infoCard['orderImage'] = photo.uri;
          setItems([...items, infoCard]);

          return photo;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function setUpdateDB() {
    try {
      const response = updateOrderStatus(orderId, orderStatus);
      if (response) {
        setUpdate(true);
      }
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }

  function setOrderDown() {
    try {
      const response = updateOrderDown(
        orderId,
        orderStatus,
        image,
        latitude,
        longitude
      );

      if (response) {
        setUpdate(true);
      }
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (orderStatus === "1") {
      setVariant("red");
    } else if (orderStatus === "2") {
      setVariant("yellow");
    } else setVariant("green");
  }, []);

  return (
    <S.Wrapper variant={variant}>
      <Modal
        animationType="slide"
        visible={isCameraOpen}
        onRequestClose={() => setIsCameraOpen(false)}
      >
        <ModalOverlay>
          <ModalContent>
            <S.StyledCamera type={CameraType.back} ref={cameraRef}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  backgroundColor: "gray",
                  position: "relative",
                }}
                onPress={takePhoto}
              >
                <TouchableOpacity
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 90,
                    position: "absolute",
                    top: 5,
                    left: 5,
                    backgroundColor: "white",
                  }}
                  onPress={takePhoto}
                ></TouchableOpacity>
              </TouchableOpacity>
            </S.StyledCamera>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      {/* Modal de atualizar o pedido */}
      <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalContent>
              <ModalHeading>Gostaria de atualizar pedido?</ModalHeading>
              <ModalButtons>
                <ButtonGreen
                  onPress={() => [
                    setIsOpen(false),
                    setUpdateDB(),
                    setVariant("yellow"),
                  ]}
                >
                  <ButtonText>Sim</ButtonText>
                </ButtonGreen>
                <ButtonRed onPress={() => setIsOpen(false)}>
                  <ButtonText>Não</ButtonText>
                </ButtonRed>
              </ModalButtons>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
      <S.Options>
        <S.OptionButton top variant={variant} activeOpacity={1}>
          <LupaIcon />
        </S.OptionButton>
        <S.OptionButton
          bottom={variant === "green" ? false : true}
          variant={variant}
          activeOpacity={1}
        >
          <ImageIcon />
        </S.OptionButton>
        {variant === "green" && (
          <S.OptionButton bottom variant={variant} activeOpacity={1}>
            <CheckIcon />
          </S.OptionButton>
        )}
      </S.Options>
      <S.Content onPress={updateCard} variant={variant}>
        <S.ContentText variant={variant}>{orderName}</S.ContentText>
        <S.ContentText variant={variant}>{orderNumber}</S.ContentText>
      </S.Content>
      <S.Footer variant={variant} onPress={updateCard}>
        <S.FooterText variant={variant}>
          {variant === "red"
            ? "EM PREPARAÇÃO"
            : variant === "yellow"
            ? "EM ROTA DE ENTREGA"
            : "ENTREGUE"}
        </S.FooterText>
      </S.Footer>
    </S.Wrapper>
  );
};

export default OrderCard;
