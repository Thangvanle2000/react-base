import { ConfigProvider, Layout } from "antd/lib";
import PermissionContent from "../middlewares/PermissionContent";

const DefaultLayout = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Noto Sans", sans-serif',
          colorPrimary: "#3BB56C",
        },
      }}
    >
      <Layout className="relative min-h-screen overflow-hidden !bg-[#f9fafd]">
        <PermissionContent />
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
