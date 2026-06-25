export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute bottom-0 left-1/2 h-[320px] w-[480px] -translate-x-1/2 rounded-full bg-[#FF6A00]/6 blur-[120px]" />
    </div>
  );
}
