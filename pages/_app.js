import "@/src/assets/sass/main.scss";
import "@/src/assets/dist/styles.css";
import ProductLayout from "@/src/components/product.layout";
import { SessionProvider, getSession } from "next-auth/react";

function AppSwitchTheme({ children }) {
  // const router = useRouter();
  // if(router.asPath.startsWith('/product')){
  //   return (
  //     <ProductLayout>
  //       INI LAYOUT PRODUCT
  //       {children}
  //     </ProductLayout>
  //   )
  // }else{
  //   return children
  // }
  return children
}

function App({Component,pageProps: { session, ...pageProps}}) {
  console.log("session app",session, pageProps)

  return (
    <SessionProvider session={session}>
      <AppSwitchTheme>
        <Component {...pageProps} />
      </AppSwitchTheme>
    </SessionProvider>
  );
}

App.getInitiapProps = async ({ Component, ctx }) => {
  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const session = await getSession(ctx);

  console.log(session,'SESSION')
  pageProps = {
    session,
    ...pageProps,
  };

  return { pageProps };
};

export default App;
