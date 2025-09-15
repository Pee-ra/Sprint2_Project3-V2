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
    <div className="w-full">
      <div className="flex justify-center w-full bg-white/90 backdrop-blur-md border-t">
        <InteractiveHoverButton
          type="submit"
          onClick={onSubmit}
          className="flex justify-between items-center px-6 py-4 text-white font-bold bg-primary rounded-none w-full max-w-md"
        >
          <span>รวมทั้งสิ้น :</span>
          <span>฿ {totalPrice}</span>
        </InteractiveHoverButton>
      </div>
    </div>
  );
}
