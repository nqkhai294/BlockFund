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
      className={`relative bg-black/40 border border-gray-800 rounded-xl p-6 overflow-hidden transition-all duration-300 ${
        isHovered ? "transform scale-[1.02] shadow-lg shadow-purple-500/10" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl" />
      )}
      <div className="relative z-10">
        <div className="bg-gray-800/80 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const Feature = () => {
  const features = [
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: "Secure Transactions",
      description:
        "All transactions are secured by blockchain technology ensuring transparency and immutability.",
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "Project Showcase",
      description:
        "Create detailed project profiles with rich media content to attract potential investors.",
    },
    {
      icon: <Wallet className="w-6 h-6 text-green-400" />,
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
      icon: <Shield className="w-6 h-6 text-red-400" />,
      title: "Smart Contracts",
      description:
        "Automated funding processes with smart contracts for transparent fund distribution.",
    },
    {
      icon: <History className="w-6 h-6 text-cyan-400" />,
      title: "Transaction History",
      description:
        "Complete history of all transactions with filtering and export capabilities.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border-b-[1px] border-b-gray border-t-[1px] border-t-gray">
      <div className="max-w-7xl w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Revolutionary Features</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">Platform Features</h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Our platform combines blockchain technology with intuitive user experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#111111] rounded-lg p-6 flex flex-col"
            >
              <div className="bg-[#1a1a1a] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feature;
