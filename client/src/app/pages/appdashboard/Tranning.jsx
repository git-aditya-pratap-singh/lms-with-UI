import "../../../assets/css/admin/_tranning.scss";
const CourseCard = ()=>{
  return(
    <section className="_courseCard"> 
      <h1>aditya</h1>
      <h1>aditya</h1>
      <h1>aditya</h1>
    </section>
  )
}

const Tranning = ()=>{
    return(
        <section className="space-y-3">

            <div className="flex justify-between items-center border p-2 rounded-md _shadow">
               <h2 className="text-[var(--foreground)]">All Course</h2>
               <div className="_searchToggle">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search"  className="w-full p-2 ps-10 text-sm border rounded-lg
                    bg-[var(--background)] text-[var(--forebackground)] focus:border-2 focus:border-[var(--ring)] focus:shadow-md" placeholder="Search..." required />
                </div>
              </div>
            </div>

            <div className="_courseGridSection bg-red-500 h-full overflow-scroll">
              {
              [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item)=>{
                return(
                  <CourseCard/>
                )
              })
              }
           
            
            </div>
        </section>
    )
}

export default Tranning;