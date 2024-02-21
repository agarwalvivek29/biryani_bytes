import { Navbar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

export function Product(){
    return(
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <SideBar />
        </div>
    )
}