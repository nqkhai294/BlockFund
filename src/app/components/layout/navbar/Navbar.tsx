import Container from "../../Container";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { client } from "@/app/types/client";
import { ConnectButton } from "thirdweb/react";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-black z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Navigation />
            <div className="hidden lg:block text-black text-sx  rounded-2xl bg-white cursor-pointer hover:bg-amber-400">
              <ConnectButton client={client} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
