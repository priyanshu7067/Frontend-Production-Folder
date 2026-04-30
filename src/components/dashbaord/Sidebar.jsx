// import { useLocation, Link } from "react-router-dom";
// import { LayoutDashboard, Users, User } from "lucide-react";
// import { sidebarMenu } from "../../constants/sidebarMenu";

// const iconMap = {
//   dashboard: LayoutDashboard,
//   users: Users,
//   user: User,
// };

// const Sidebar = ({ open }) => {
//   const location = useLocation();
//   const menu = sidebarMenu[0] || [];

//   return (
//     <aside className={`bg-black text-white ${open ? "w-64" : "w-16"} transition-all`}>

//       <div className="p-4 font-bold">MF</div>

//       <nav className="flex flex-col gap-2">
//         {menu.map((item, i) => {
//           const Icon = iconMap[item.icon];

//           return (
//             <Link
//               key={i}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-800 ${
//                 location.pathname === item.path ? "bg-gray-800" : ""
//               }`}
//             >
//               <Icon size={18} />
//               {open && <span>{item.name}</span>}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Users, User, BarChart } from "lucide-react";
import { sidebarMenu } from "../../constants/sidebarMenu";

const iconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  user: User,
  chart: BarChart,
};

const Sidebar = ({ open }) => {
  const location = useLocation();

  // 🔥 URL se role detect
  const role = location.pathname.startsWith("/admin") ? "admin" : "user";

  const menu = sidebarMenu[role] || [];

  return (
    <aside className={`bg-black text-white ${open ? "w-64" : "w-16"} transition-all`}>

      <div className="p-4 font-bold">MF</div>

      <nav className="flex flex-col gap-2">
        {menu.map((item, i) => {
          const Icon = iconMap[item.icon];

          return (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-800 ${location.pathname === item.path ? "bg-gray-800" : ""
                }`}
            >
              <Icon size={18} />
              {open && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;