import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button type="submit">
        <div className="flex ">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </div>
      </button>
    </form>
  );
}
