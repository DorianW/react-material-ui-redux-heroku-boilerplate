export interface IRoom {
  name?: string;
  id: number;
  temp?: number;
  isCooling?: boolean;
  isHeating?: boolean;
  isMain?: boolean;
  settings?: Array<Array<IRoomTempSetting>>;
}

export interface IExpertData {
  name: string;
  value: string;
}

export interface IVacationData {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  id: number;
  temp: number;
  selectedRooms: Array<number>;
}

export interface IRoomTempSetting {
  id: number;
  start: string;
  end: string;
  temp: number;
}

export interface IWaterPump {
  currentTemp: number;
  targetTemp: number;
}
