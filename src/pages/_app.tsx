import { type Session } from "next-auth";
import { SessionProvider} from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Header from "./components/Header";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="w-screen mx-auto">
        <Header/>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
