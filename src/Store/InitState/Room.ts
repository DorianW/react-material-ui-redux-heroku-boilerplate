import { IRoom } from "../../Interfaces/Interfaces";

const initialRoomState: Array<IRoom> = [
  {
    id: 1,
    name: "Wohnzimmer",
    temp: 20.5,
    isCooling: false,
    isMain: true,
    isHeating: false,
    settings: [
      [
        {
          id: 1,
          start: "8:00",
          end: "17:00",
          temp: 19,
        },
        {
          id: 2,
          start: "17:00",
          end: "21:00",
          temp: 22,
        },
      ],
    ],
  },
  {
    id: 2,
    name: "Kinderzimmer",
    temp: 22.5,
    isCooling: false,
    isMain: false,
    isHeating: true,
    settings: [],
  },
  {
    id: 3,
    name: "Schlafzimmer",
    temp: 19,
    isCooling: true,
    isMain: true,
    isHeating: false,
    settings: [],
  },
  {
    id: 4,
    name: "Küche",
    temp: 23.5,
    isCooling: false,
    isMain: true,
    isHeating: false,
    settings: [],
  },
];

export default initialRoomState;
