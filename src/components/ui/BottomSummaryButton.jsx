import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InteractiveHoverButton } from "../magicui/HoverButton";

export default function BottomSummaryButton({ totalPrice, onSubmit, show }) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setIsAtBottom(bottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`z-50 transition-all duration-300 w-full ${
        isAtBottom ? "sticky bottom-0 left-0" : "fixed bottom-0 left-0"
      }`}
    >
      <div className="flex justify-center w-full bottom-0">
        <Link to="/payment">
          <InteractiveHoverButton
            onClick={onSubmit}
            className="flex justify-between items-center px-6 py-4 text-white font-bold bg-primary rounded-lg  min-w-[250px] max-w-[350]"
          >
            <span>รวมทั้งสิ้น :</span>
            <span>฿ {totalPrice}</span>
          </InteractiveHoverButton>
        </Link>
      </div>
    </div>
  );
}
