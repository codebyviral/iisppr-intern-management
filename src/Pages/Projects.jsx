import { useEffect, useState } from "react";
import { Navbar, SideNav, Wrapper, Footer } from "@/Components/compIndex";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/project/all`
        );
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
          <h1 className="mb-4 text-3xl font-bold text-slate-800">Projects</h1>

          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">No projects found. Please check back later!</p>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col w-full h-auto mx-auto mb-6 border-2 rounded-lg shadow-lg project-container md:flex-row md:w-128 bg-slate-500 text-black-90"
              >
                {/* Left side: Image */}
                <div className="w-full project-image md:w-1/3">
                  <img
                    src={project.image} // Assuming 'image' is the correct field
                    alt="Project"
                    className="object-cover w-full h-64 rounded-t-lg md:h-full md:rounded-l-lg"
                  />
                </div>

                {/* Right side: Description */}
                <div className="w-full p-4 overflow-y-auto project-description md:w-2/3">
                  <div className="project-main-heading">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>{" "}
                    {/* Assuming 'title' is the correct field */}
                  </div>

                  <div className="mt-2 project-short-description">
                    <h5 className="text-lg text-white">{project.subTitle}</h5>{" "}
                    {/* Assuming 'subTitle' is the correct field */}
                  </div>

                  <div className="mt-4 project-long-description">
                    <p className="text-white">{project.description}</p>{" "}
                    {/* Assuming 'description' is the correct field */}
                  </div>

                  <div className="mt-4 project-by">
                    <p className="text-white">By: {project.createdBy}</p>{" "}
                    {/* Assuming 'createdBy' is the correct field */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Projects;
