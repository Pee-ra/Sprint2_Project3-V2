const ALL_CLOTHES = [
  { id: 1, img: "./public/cloth/blanket1.png" },
  { id: 2, img: "./public/cloth/curtain2.png" },
  { id: 3, img: "./public/cloth/blanket3.png" },
  { id: 4, img: "./public/cloth/suite2.png" },
  { id: 5, img: "./public/cloth/suite1.png" },
  { id: 6, img: "./public/cloth/zip-dress.png" },
  { id: 7, img: "./public/cloth/blanket2.png" },
];

export default function CustomMarquee() {
  const displayList = ALL_CLOTHES;

  return (
    <div className="">
      <div className="flex justify-center gap-5">
        {displayList.map((item) => (
          <div
            key={item.id}
            className="w-12 h-12 relative group overflow-visible"
          >
            <img
              src={item.img}
              alt={`Cloth ${item.id}`}
              className={`
            w-full h-full object-cover
            transition-all duration-300 group-hover:scale-250
            cursor-grab
          `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
