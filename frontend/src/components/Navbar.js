import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";

export default function NavBar() {
  const { router, profile } = useContext(AuthContext);
  return (
    <nav className="flex justify-center">
      {profile ? (
        <Button
          onClick={() => router.push(`/profiles/${profile.id}`)}
          className="border"
        >
          My Account
        </Button>
      ) : (
        <Button onClick={() => router.push(`/account`)} className="border">
          Log In
        </Button>
      )}
    </nav>
  );
}
