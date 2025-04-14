import { Home } from "../pages/Home/views/HomePage";
import { RouteProps } from "../types/common";
import config from "./routes";

const routes: RouteProps[] = [
  {
    path: config.route.home,
    element: Home,
    name: "Trang chủ",
  },
];

export default routes;
