import "../../assets/css/component/_notificationPopup.scss";

const NotificationPopup = ()=>{
    return(
        <>
        <section className="_notificationpopup">
            <div className="_popupArrow"></div>
            <label>Notification</label>
            <div className="_notificationCenter">
               <ul className="space-y-4">
                <li>Enhanced User Interface: Enjoy a more intuitive and user-friendly navigation experience</li>
                <li>New Interactive Tools: Engage with new interactive elements to make learning more dynamic.</li>
                <li>Improved Performance: Faster load times and smoother functionality for a seamless experience.</li>
                <li>Additional Resources: Access a broader range of learning materials and support resources.</li>
               </ul>
            </div>
        </section>
        </>
    )
}
export default NotificationPopup;