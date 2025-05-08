import {useRouter} from "next/navigation";

export function HpHowItWorks() {

    const router = useRouter();

    const steps = [
      {
        title: "Create a Project",
        description:
          "Set up your project with comprehensive details, funding goals, and timeline. Add images, videos, and documentation to showcase your vision.",
        position: "left",
      },
      {
        title: "Connect Your Wallet",
        description:
          "Securely connect your cryptocurrency wallet to invest in projects or receive funding. We support MetaMask and other popular wallets.",
        position: "right",
      },
      {
        title: "Fund or Get Funded",
        description:
          "Browse projects to invest in or share your project to receive funding. All transactions are secured by smart contracts.",
        position: "left",
      },
      {
        title: "Track Progress",
        description:
          "Monitor your investments or funding progress through your personalized dashboard with detailed analytics.",
        position: "right",
      },
    ];
  
    return (
      <section id="how-it-works" className="py-20 bg-black text-white border-b-[1px] border-b-gray">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How BlockFund works</h2>
          <p className="text-lg text-yellow-400 mb-16">
            Our platform makes project funding and investment straightforward
          </p>
  
          <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2 z-0 pointer-events-none" />

  
            <div className="flex flex-col gap-12 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center justify-center w-full relative"
                >
                  {step.position === "left" ? (
                    <>
                      <div className="flex-1 text-center lg:text-left order-2 lg:order-1 lg:pr-12">
                        <div className="inline-block p-6 rounded-xl shadow border border-gray-700 max-w-md ml-auto mr-auto lg:mr-0">
                          <h3 className="text-xl text-yellow-400 font-semibold mb-2">{step.title}</h3>
                          <p className="text-white">{step.description}</p>
                        </div>
                      </div>
                      <div className="order-1 lg:order-2 mx-auto mb-4 lg:mb-0">
                        <div className="w-12 h-12 rounded-full bg-black text-white font-bold shadow-lg border-4 border-white flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 order-3 lg:pl-12" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1 order-3 lg:order-1 lg:pr-12" />
                      <div className="order-1 lg:order-2 mx-auto mb-4 lg:mb-0">
                        <div className="w-12 h-12 rounded-full bg-black text-white font-bold shadow-lg border-4 border-white flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 text-center lg:text-left order-2 lg:order-3 lg:pl-12">
                        <div className="inline-block p-6 rounded-xl shadow border border-gray-700 max-w-md ml-auto mr-auto lg:ml-0">
                          <h3 className="text-xl text-yellow-400 font-semibold mb-2">{step.title}</h3>
                          <p className="text-white">{step.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          <div className="mt-16 text-center">
            <button
              onClick={() => router.push("/projects")}
            className="bg-white text-black hover:bg-amber-400 text-lg font-medium px-6 py-3 rounded-3xl bg-gradient-to-r border border-gray-600 shadow hover:scale-105 transition-transform cursor-pointer">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  export default HpHowItWorks;