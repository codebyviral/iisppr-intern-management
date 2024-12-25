import { useEffect, useState } from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://iisppr-backend.vercel.app/project/all");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data); 
          setProjects(data); 
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <SideNav />
      <Navbar />
      <Wrapper>
        <div className="flex flex-col items-center py-6 pb-36">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Projects</h1>

          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="project-container flex flex-col md:flex-row w-full md:w-128 h-auto mx-auto bg-slate-500 rounded-lg shadow-lg border-2 text-black-90 mb-6"
              >
                {/* Left side: Image */}
                <div className="project-image w-full md:w-1/3">
                  <img
                    src={project.image}  // Assuming 'image' is the correct field
                    alt="Project"
                    className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg"
                  />
                </div>

                {/* Right side: Description */}
                <div className="project-description w-full md:w-2/3 p-4 overflow-y-auto">
                  <div className="project-main-heading">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3> {/* Assuming 'title' is the correct field */}
                  </div>

                  <div className="project-short-description mt-2">
                    <h5 className="text-lg text-white">{project.subTitle}</h5> {/* Assuming 'subTitle' is the correct field */}
                  </div>

                  <div className="project-long-description mt-4">
                    <p className="text-white">{project.description}</p> {/* Assuming 'description' is the correct field */}
                  </div>

                  <div className="project-by mt-4">
                    <p className="text-white">By: {project.createdBy}</p> {/* Assuming 'createdBy' is the correct field */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Projects;
