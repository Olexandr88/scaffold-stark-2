import React, { useState } from "react";
import useControllerAccount from "../hooks/useControllerAccount";
import Image from "next/image";  
import Cartridge from "../public/Cartridge.png"; 

const ControllerButton: React.FC = () => {
  const {
    userName,
    userAccountController,
    isConnected,
    handleConnect,
    handleDisconnect,
  } = useControllerAccount();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const slicedAddress = userAccountController
    ? `${userAccountController.slice(0, 6)}...${userAccountController.slice(-4)}`
    : "Controller";

  return (
    <div className="relative">
      <button
        onClick={isConnected ? toggleMenu : handleConnect}
        className="flex items-center rounded-[20px] btn-sm font-bold px-6 bg-btn-wallet py-4 cursor-pointer"
        style={{
          height: "45px",
        }}
      >
        <Image
          src={Cartridge}
          alt="User Icon"
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          style={{
            marginRight: "15px",
            marginLeft: "12px", 
          }}
        />
        <span
          className="flex-grow text-center"
          style={{
            lineHeight: "50px", 
            fontWeight: "bold",
          }}
        >
          {isConnected ? userName || "Connected" : "Controller"}
        </span>
        <span
          className={`transform transition-transform duration-300 ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          style={{ marginRight: "10px" }}
        >
        </span>
      </button>

      {isMenuOpen && isConnected && (
        <div
          className="absolute mt-2 p-4 rounded-md shadow-lg"
          style={{
            backgroundColor: "#2C2F33",
            border: "1px solid #520066",
            color: "white",
            width: "220px",
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm">
              <strong>Name:</strong>{" "}
              <span style={{ fontWeight: "normal" }}>{userName || "No Name"}</span>
            </p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">
              <strong>Address:</strong> {" "}
              <span style={{ fontWeight: "normal" }}>{slicedAddress || "No Address"}</span>
            </p>
            <button
              onClick={() => navigator.clipboard.writeText(userAccountController || "")}
              className="ml-2 text-white hover:text-gray-400 transition duration-300"
              title="Copiar Dirección"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m4 4v6a2 2 0 01-2 2h-8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={handleDisconnect}
            className="w-full bg-[#520066] hover:bg-[#6A0080] text-white font-bold py-2 rounded-md transition duration-300 ease-in-out"
          >
            Disconnected
          </button>
        </div>
      )}
    </div>
  );
};

export default ControllerButton;
