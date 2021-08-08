import React, { createContext, useReducer, FC } from "react";
import { IRoom, IWaterPump, IVacationData } from "../Interfaces/Interfaces";
import initialRoomState from "./InitState/Room";
import initWaterPumpState from "./InitState/WaterPump";
import initVacation from "./InitState/VacationData";
export const LOCAL_STORAGE_NAME = "Wojda_SmartHome_Demo_App_V1";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

enum RoomActionTypes {
  UPDATE_ROOM_NAME = "UPDATE_ROOM_NAME",
  TOGGLE_IS_MAIN = "TOGGLE_IS_MAIN",
  UPDATE_ROOM = "UPDATE_ROOM",
  SET_ROOM = "SET_ROOM",
}

enum NotificationActionTypes {
  ACKNOWLEDGE = "ACKNOWLEDGE",
}

enum WaterPumpActionTypes {
  UPDATE_TARGET_TEMP = "UPDATE_TARGET_TEMP",
}

enum VacationActionTypes {
  DELETE_VACATION = "DELETE_VACATION",
  UPDATE_VACATION = "UPDATE_VACATION",
  ADD_VACATION = "ADD_VACATION",
}

enum UserActionTypes {
  SET_TOKEN = "SET_TOKEN",
  LOGOUT = "LOGOUT",
}

type RoomPayload = {
  [RoomActionTypes.TOGGLE_IS_MAIN]: {
    id: number;
  };
  [RoomActionTypes.UPDATE_ROOM_NAME]: {
    id: number;
    name: string;
  };
  [RoomActionTypes.UPDATE_ROOM]: IRoom;
  [RoomActionTypes.SET_ROOM]: IRoom;
};

type NotificationPayload = {
  [NotificationActionTypes.ACKNOWLEDGE]: {
    id: number;
  };
};

type WaterPumpPayload = {
  [WaterPumpActionTypes.UPDATE_TARGET_TEMP]: { temp: number };
};

type VacationPayload = {
  [VacationActionTypes.DELETE_VACATION]: { id: number };
  [VacationActionTypes.UPDATE_VACATION]: IVacationData;
  [VacationActionTypes.ADD_VACATION]: IVacationData;
};

type UserPayload = {
  [UserActionTypes.LOGOUT]: {};
  [UserActionTypes.SET_TOKEN]: { token: string };
};

export type RoomActions = ActionMap<RoomPayload>[keyof ActionMap<RoomPayload>];
export type NotificationActions =
  ActionMap<NotificationPayload>[keyof ActionMap<NotificationPayload>];
export type WaterPumpActions =
  ActionMap<WaterPumpPayload>[keyof ActionMap<WaterPumpPayload>];
export type VacationActions =
  ActionMap<VacationPayload>[keyof ActionMap<VacationPayload>];
export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export interface IMainState {
  rooms: Array<IRoom>;
  waterPump: IWaterPump;
  vacation: Array<IVacationData>;
  token: string;
}

const getInitialState = (): IMainState => {
  const stateInMemory = localStorage.getItem(LOCAL_STORAGE_NAME);
  if (stateInMemory == null) {
    const initState: IMainState = {
      rooms: initialRoomState,
      waterPump: initWaterPumpState,
      vacation: initVacation,
      token: "",
    };
    initState.rooms = initialRoomState;
    return initState;
  } else {
    return JSON.parse(stateInMemory);
  }
};

const saveState = (state: IMainState) => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state));
};

const initialMainState = getInitialState();

const mainReducer = (
  state: IMainState,
  action:
    | RoomActions
    | NotificationActions
    | WaterPumpActions
    | VacationActions
    | UserActions
): IMainState => {
  let copyState = { ...state };
  switch (action.type) {
    case RoomActionTypes.UPDATE_ROOM_NAME:
      copyState.rooms.forEach((room) => {
        if (room.id == action.payload.id) {
          room.name = action.payload.name;
        }
      });
      saveState(copyState);
      return copyState;
    case RoomActionTypes.TOGGLE_IS_MAIN:
      copyState.rooms.forEach((room) => {
        if (room.id == action.payload.id) {
          room.isMain = !room.isMain;
        }
      });
      saveState(copyState);
      return copyState;
    case RoomActionTypes.UPDATE_ROOM:
      copyState.rooms.forEach((room, index) => {
        if (room.id == action.payload.id) {
          copyState.rooms[index] = { ...action.payload };
        }
      });
      saveState(copyState);
      return copyState;
    case RoomActionTypes.SET_ROOM:
      copyState.rooms[action.payload.id - 1] = action.payload;
      saveState(copyState);
      return copyState;

    case WaterPumpActionTypes.UPDATE_TARGET_TEMP:
      copyState.waterPump.targetTemp = action.payload.temp;
      saveState(copyState);
      return copyState;
    case VacationActionTypes.DELETE_VACATION:
      copyState.vacation = copyState.vacation.filter(
        (item) => item.id != action.payload.id
      );
      saveState(copyState);
      return copyState;
    case VacationActionTypes.UPDATE_VACATION:
      copyState.vacation.forEach((vacation, index) => {
        if (vacation.id == action.payload.id) {
          copyState.vacation[index] = { ...action.payload };
        }
      });
      saveState(copyState);
      return copyState;
    case VacationActionTypes.ADD_VACATION:
      copyState.vacation.push(action.payload);
      saveState(copyState);
      return copyState;
    case UserActionTypes.SET_TOKEN:
      copyState.token = action.payload.token;
      saveState(copyState);
      return copyState;
    case UserActionTypes.LOGOUT:
      copyState.token = "";
      saveState(copyState);
      return copyState;
    default:
      return state;
  }
};

const Context = createContext<{
  state: IMainState;
  dispatch: React.Dispatch<
    | RoomActions
    | NotificationActions
    | WaterPumpActions
    | VacationActions
    | UserActions
  >;
}>({
  state: initialMainState,
  dispatch: () => null,
});

const StoreProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(mainReducer, initialMainState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export {
  Context,
  StoreProvider,
  RoomActionTypes,
  WaterPumpActionTypes,
  VacationActionTypes,
  UserActionTypes,
};
