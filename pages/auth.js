import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";

function AuthPage() {
  return <AuthForm />;
}

export async function getServerSideProps(contex) {
  const session = await getSession({ req: contex.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default AuthPage;
