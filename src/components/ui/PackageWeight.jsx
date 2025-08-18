import React from "react";

const Row = ({ placeholder }) => (
  <label className="block">
    <span className="sr-only">{placeholder}</span>
    <div className="flex items-center justify-between rounded-full border border-slate-300 px-4 py-2 bg-white">
      <input
        className="w-full bg-transparent outline-none placeholder:text-slate-500"
        placeholder={placeholder}
      />
      <span className="ml-3 text-slate-500">บาท</span>
    </div>
  </label>
);

const Card = ({ title, subtitle, rows }) => (
  <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm flex flex-col h-full">
    <div className="text-center">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>

    <div className="mt-6 space-y-3">
      {rows.map((p) => (
        <Row key={p} placeholder={p} />
      ))}
    </div>

    <button
      type="button"
      className="bg-teal-600 mt-6 w-full rounded-full bg-slate-200 text-slate-700 py-2.5 font-medium cursor-not-allowed text-white"
    >
      Get Started
    </button>
  </div>
);

const PackageWeight = () => {
  return (
    <section className="mx-auto max-w-5xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          title="คิดตามน้ำหนัก"
          subtitle="ราคาเริ่มต้นตามน้ำหนัก"
          rows={["1 กิโลกรัม", "1 กิโลกรัม", "1 กิโลกรัม"]}
        />
        <Card
          title="คิดตามชิ้น"
          subtitle="ราคาแยกตามชิ้น"
          rows={["เสื้อ", "กางเกง", "ชุด"]}
        />
      </div>
    </section>
  );
};

export default PackageWeight;
