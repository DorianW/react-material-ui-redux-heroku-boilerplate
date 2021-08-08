import { IVacationData } from "../../Interfaces/Interfaces";

export const initState: Array<IVacationData> = [
  {
    id: 1,
    startTime: "08:45",
    endTime: "08:00",
    startDate: "15.01.2021",
    endDate: "21.02.2021",
    temp: 20,
    selectedRooms: [1, 2],
  },
];

export default initState;
