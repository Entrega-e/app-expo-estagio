import Api from "./Api";

export type json = {
  status: string;
  foto?: string;
  latitude?: number;
  longitude?: number;
};

export function updateOrderStatus(orderId: number, status: string) {
  let converter: number = Number(status) + 1;
  let newStatus: string = String(converter);
  const data: json = { status: newStatus };

  try {
    const response = Api.put(`order/updatestatus/${orderId}`, data);
    return response;
  } catch (err) {
    return err;
  }
}

export function updateOrderDown(
  orderId: number,
  status: string,
  foto: string,
  latitude: number,
  longitude: number
) {
  let converter: number = Number(status) + 1;
  let newStatus: string = String(converter);
  const data: json = {
    status: newStatus,
    foto: foto,
    latitude: latitude,
    longitude: longitude,
  };
  try {
    const response = Api.put(`order/updatetodown/${orderId}`, data);
    return response;
  } catch (err) {
    return err;
  }
}
