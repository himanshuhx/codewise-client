import { io } from "socket.io-client";

export const initSocket = async () => {
  return io("http://localhost:5000", {
    forceNewConnection: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  });
};
