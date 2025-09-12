export default function QuantitySelector({ item, customItems, setCustomItems }) {
  const cartItem = customItems.find((i) => i.name === item.name);
  const quantity = cartItem ? cartItem.quantity : 0;

  const increase = () => {
    setCustomItems((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (!exists) {
        return [...prev, { ...item, quantity: 1 }];
      }
      return prev.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
    });
  };

  const decrease = () => {
    setCustomItems((prev) => {
      if (quantity <= 1) {
        return prev.filter((i) => i.name !== item.name);
      }
      return prev.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrease}
        disabled={quantity <= 0}
        className="w-8 h-8 border rounded-full hover:bg-chart-1 hover:text-white"
      >
        -
      </button>
      <span className="w-6 text-center">{quantity}</span>
      <button
        onClick={increase}
        className="w-8 h-8 border rounded-full hover:bg-primary hover:text-white"
      >
        +
      </button>
    </div>
  );
}
