import Sidebar from "../component/sidebar";
const Dashboard = ({children}) => {
  return ( 
    <main className="flex h-screen w-full overflow-hidden ">
    <Sidebar />
    <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hidden">
      <main className="flex-1 p-5">
        {children}
      </main>
    </div>
  </main>
)};

export default Dashboard;