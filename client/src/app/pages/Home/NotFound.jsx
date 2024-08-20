import notFound from "../../../assets/img/notFound.png";
const NotFound = ()=>{
    return(
        <>
        <section  className="h-[100vh] w-full flex flex-col justify-center items-center">
            <label className="text-[var(--foreground)] text-[1.5rem]">You are lost in Space</label>
            <img src={notFound} className="w-[350px]"/>
            <span className="text-[3.5rem] text-[var(--primary)] font-bold">OOPS !</span>
        </section>
        </>
    )
}
export default NotFound;