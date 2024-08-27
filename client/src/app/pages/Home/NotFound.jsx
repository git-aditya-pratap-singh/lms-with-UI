import { NavLink } from "react-router-dom";
import notFound from "../../../assets/img/notFound.png";

const NotFound = ()=>{
    return(
        <>
        <section  className="h-[100vh] w-full flex flex-col justify-center items-center">
            <label className="text-[var(--foreground)] text-[1.3rem]">You are lost in Space.</label>
            <img src={notFound} className="w-[350px]"/>
            <span className="text-[3.5rem] text-[var(--primary)] font-bold">Oops !</span>
            <label className="text-[var(--foreground)] text-[1.01rem]" style={{animation: "var(--slide-down)"}}>We couldn't find the page you are looking for.</label>
            <NavLink to="/dashboard/home">
                <button className="mt-5 ring-1 py-2 px-3 rounded shadow-sm text-white bg-gray-600">Go back to the homepage</button>
            </NavLink>
        </section>
        </>
    )
}
export default NotFound;