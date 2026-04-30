const DashboardHeader = ({ role, setOpen }) => {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      
      <button onClick={() => setOpen(prev => !prev)}>☰</button>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">
          {role === "admin" ? "Admin Panel" : "User Dashboard"}
        </span>
      </div>
    </header>
  );
};
export default DashboardHeader