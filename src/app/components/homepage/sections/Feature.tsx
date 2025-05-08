import React, { useState } from "react";
import {
  Lock,
  FileText,
  Wallet,
  PieChart,
  Shield,
  History,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative z-0 bg-black/40 border border-yellow-500/20 rounded-xl p-6 overflow-hidden transition-all duration-300 ${
        isHovered ? "transform scale-[1.02] shadow-lg shadow-yellow-500/10" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl" />
      )}
      <div className="relative z-10">
        <div className="bg-yellow-500/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const Feature = () => {
  const features = [
    {
      icon: <Lock className="w-6 h-6 text-yellow-400" />,
      title: "Secure Transactions",
      description:
        "All transactions are secured by blockchain technology ensuring transparency and immutability.",
    },
    {
      icon: <FileText className="w-6 h-6 text-yellow-400" />,
      title: "Project Showcase",
      description:
        "Create detailed project profiles with rich media content to attract potential investors.",
    },
    {
      icon: <Wallet className="w-6 h-6 text-yellow-400" />,
      title: "Wallet Integration",
      description:
        "Connect your cryptocurrency wallet seamlessly to invest in projects directly.",
    },
    {
      icon: <PieChart className="w-6 h-6 text-yellow-400" />,
      title: "Investment Analytics",
      description:
        "Track your investments with detailed analytics and performance metrics.",
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-400" />,
      title: "Smart Contracts",
      description:
        "Automated funding processes with smart contracts for transparent fund distribution.",
    },
    {
      icon: <History className="w-6 h-6 text-yellow-400" />,
      title: "Transaction History",
      description:
        "Complete history of all transactions with filtering and export capabilities.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border-b-[1px] border-yellow-500/20 border-t-[1px] border-yellow-500/20">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-white ">
          Revolutionary Features
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-3 text-yellow-400">
          Platform Features
        </h2>
        <p className="text-center text-white mb-16 max-w-2xl mx-auto">
          Our platform combines blockchain technology with intuitive user experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feature;
