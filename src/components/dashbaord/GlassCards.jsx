export const GlassCards = ({ children }) => {
  return (
    <div className="glass rounded-xl p-4 border border-white/10 hover:bg-white/5 transition">
      {children}
    </div>
  );
};