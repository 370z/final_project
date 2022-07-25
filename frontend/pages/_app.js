// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import { wrapper } from "../store/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import DefaultLayout from "../Layouts/default";
import AdminLayout from "../Layouts/admin";

const layouts = {
  Default: DefaultLayout,
  Admin: AdminLayout,
};
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);

