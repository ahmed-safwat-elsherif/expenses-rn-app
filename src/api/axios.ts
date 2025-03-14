import axiosBase from "axios";
import sleep from "../utils/sleep";

const axios = axiosBase.create({
  baseURL: "https://react-native-f897f-default-rtdb.firebaseio.com/",
});

axios.interceptors.request.use(async (config) => {
  config.url = config.url + ".json";
  await sleep(2000);
  return config;
});

export default axios;
