import { useContext } from "react";
import Context from "./Context";

export default function useDatabase() {
  return useContext(Context);
}
