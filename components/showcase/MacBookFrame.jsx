export default function MacBookFrame({ children }) {
  return (
    <div className="relative w-full select-none">
      <div className="relative bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] rounded-t-[14px] rounded-b-[4px] p-[1.4%] shadow-[0_30px_60px_-15px_rgba(28,24,20,0.25)]">
        <div className="absolute top-[0.7%] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#0a0a0a] ring-1 ring-[#3a3a3c]" />
        <div className="aspect-[16/10] bg-white rounded-[6px] overflow-hidden relative">
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>
      </div>
      <div className="relative h-[14px] mx-[-3%]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#cfd0d3] via-[#b8b9bc] to-[#9d9ea1] rounded-b-[10px] shadow-[0_8px_16px_-4px_rgba(28,24,20,0.18)]" />
        <div className="absolute top-0 left-[42%] right-[42%] h-[3px] bg-gradient-to-b from-[#7a7b7d] to-[#9d9ea1] rounded-b-md" />
      </div>
    </div>
  );
}
