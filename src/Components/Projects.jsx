import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";

const Projects = () => {
  const projectFeatures = [
    {
      img: "https://img.atom.com/story_images/visual_images/1707439420-Intern2%20image1.jpg?class=listing",
      title: "Intern Management System",
      shortDescription: "The platform for interns",
      longDescription:
        "An Intern Management System is a platform designed to streamline the process of managing internships within an organization. It allows companies to efficiently track and manage intern applications, assignments, and performance. The system enables easy onboarding of interns, assignment of mentors, and real-time tracking of progress and feedback. Additionally, it provides features for evaluating interns' performance, generating reports, and ensuring smooth communication between interns and supervisors. Overall, it enhances the internship experience for both the interns and the organization by promoting organization, transparency, and productivity.",
      by: "The iispr team",
    },
  ];

  return (
    <>
      <SideNav />
      <Navbar />
      <Wrapper>
        <div className="project-container flex flex-col md:flex-row w-full md:w-128 h-auto mx-auto bg-slate-500 rounded-lg shadow-lg border-2 text-black-90">
          {/* Left side: Image */}
          <div className="project-image w-full md:w-1/3">
            <img
              src={projectFeatures[0].img}
              alt="Project image"
              className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg"
            />
          </div>

          {/* Right side: Description */}
          <div className="project-description w-full md:w-2/3 p-4 overflow-y-auto">
            <div className="project-main-heading">
              <h3 className="text-2xl font-bold text-white">
                {projectFeatures[0].title}
              </h3>
            </div>

            <div className="project-short-description mt-2">
              <h5 className="text-lg text-white">
                {projectFeatures[0].shortDescription}
              </h5>
            </div>

            <div className="project-long-description mt-4">
              <p className="text-white">{projectFeatures[0].longDescription}</p>
            </div>

            <div className="project-by mt-4">
              <p className="text-white">By: {projectFeatures[0].by}</p>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Projects;
