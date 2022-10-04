// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import { wrapper } from "../store/store";
import "../styles/globals.css";
import { useSession, SessionProvider } from "next-auth/react";
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
      {Layout.Auth ? (
        <Layout>
        <Auth>
          <Component {...pageProps} />
        </Auth>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}


export default wrapper.withRedux(MyApp);

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });
  console.log("STATUS::::", status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
