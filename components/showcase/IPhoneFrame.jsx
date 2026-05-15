export default function IPhoneFrame({ children }) {
  return (
    <div className="relative aspect-[9/19] w-full select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0a] rounded-[14%] shadow-[0_24px_48px_-12px_rgba(28,24,20,0.35)]">
        <div className="absolute inset-[2.5%] bg-[#0a0a0a] rounded-[12%] overflow-hidden">
          <div className="absolute top-[1.8%] left-1/2 -translate-x-1/2 w-[34%] h-[3.2%] bg-black rounded-full z-20 ring-1 ring-[#1c1c1e]" />
          <div className="absolute inset-[1.5%] bg-white rounded-[10%] overflow-hidden">
            {children}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[14%] ring-1 ring-inset ring-white/5" />
      </div>
    </div>
  );
}
