import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { ChromeIcon } from "lucide-react";
export default function GoogleProvider() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" className="w-full mt-2" type="submit">
        <ChromeIcon className="mr-2 h-4 w-4" />
        Google
      </Button>
    </form>
  );
}
