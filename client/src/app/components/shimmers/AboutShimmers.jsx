import { ShimmerTitle, ShimmerButton, ShimmerCircularImage } from "react-shimmer-effects";

const AboutShimmers = ()=>{
    return(
        <>
        <section className="">
            <ShimmerCircularImage size={150} className="ml-12 mt-8"/>
  
            <ShimmerTitle line={5} gap={10} variant="primary" />
              
            <ShimmerButton size="md"/>

        </section>
        </>
    )
}
export default AboutShimmers;