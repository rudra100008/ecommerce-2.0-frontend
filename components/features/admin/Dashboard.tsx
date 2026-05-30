import { EyeIcon, IndianRupee, ShoppingCart, User2Icon } from "lucide-react";
import DashboardCard from "./DashboardCard";


export default function Dashboard(){
    return(
        <div>
            {/* Cards */}
            <div className="grid grid-cols-4 gap-4 ">
               <DashboardCard  title="Total Revenue" value={"₹48,255"} icon={IndianRupee} trend={12}/>
               <DashboardCard title="Active Users" value={2000} icon={User2Icon}  trend={-3}/>
               <DashboardCard title="Total Orders" value={2000} icon={ShoppingCart}  trend={8} />
               <DashboardCard title="Total views" value={2000} icon={EyeIcon}  trend={5}/>
            </div>
        </div>
    )
}