import React from "react";
import Lottie from "lottie-react";
import whale from "../components/lottie/whale.json";
import { TypingAnimation } from "../components/magicui/typing-animation";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center rounded-xl  p-6">
        <Lottie animationData={whale} className="object-contain" />
      </div>

      <TypingAnimation className={"text-center text-2xl absolute bottom-10"}>
        ยินดีต้อนรับครับสุดหล่อ
      </TypingAnimation>
    </div>
  );
};

export default Loading;
