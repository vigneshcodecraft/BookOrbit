import GoogleProvider from "@/components/GoogleProvider";
import LoginPage from "@/components/LoginPage";

export default function Page() {
  return (
    <>
      <LoginPage>
        <GoogleProvider />
      </LoginPage>
    </>
  );
}
