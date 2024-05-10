import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import FromInfo from "../../components/form/formInfo";

import "../../../assets/css/admin/_courses.scss";

const Course = () => {
    return (
        <>
            <section className="_courseContainer">
                <h2 className="text-[1.25rem] text-gray-800">Add New <span className="text-blue-600">Course{`'s`}</span></h2>
                <div className="_courseHeader -mt-3">
                    <FromInfo />
                </div>
                <div className="_courseFooter">
                    <label><button className="_coursebt">Submit <FaArrowRight size={12} /></button></label>
                </div>
            </section>
        </>
    )
}
export default Course;