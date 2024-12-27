import { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";

const AdminProject = () => {
  const [project, setProject] = useState({
    title: "",
    subTitle: "",
    description: "",
    image: "",
    createdBy: "",
  });

  const [postedProjects, setPostedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setProject({
        ...project,
        [name]: files[0],
      });
    } else {
      setProject({
        ...project,
        [name]: value,
      });
    }
  };

  const handlePostProject = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("subTitle", project.subTitle);
      formData.append("description", project.description);
      formData.append("image", project.image);
      formData.append("createdBy", project.createdBy);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post the project");
      }

      const data = await response.json();

      setPostedProjects([...postedProjects, data]);

      setProject({
        title: "",
        subTitle: "",
        description: "",
        image: "",
        createdBy: "",
      });
    } catch (error) {
      console.error("Error posting project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ProjectId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/project/delete/${ProjectId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      setPostedProjects(
        postedProjects.filter((project) => project._id !== ProjectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/project/all`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setPostedProjects(data);
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
      <CustomNavbar />
      <div className="flex flex-col md:flex-row w-full h-auto md:h-screen">
        {/* Left Side (Form for Admin) */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg mx-auto mt-6 border-2 md:ml-5 md:mr-2">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Create New Project
          </h2>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>

          {/* Project Title */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write title for project"
            />
          </div>

          {/* Sub Title */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Sub Title
            </label>
            <input
              type="text"
              name="subTitle"
              value={project.subTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a short description"
            />
          </div>

          {/* Project Description */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write description about the project"
            />
          </div>

          {/* Created By (Team Name) */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">
              Created By
            </label>
            <input
              type="text"
              name="createdBy"
              value={project.createdBy}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="By the team"
            />
          </div>

          {/* Post Project Button */}
          <div className="text-center">
            <button
              onClick={handlePostProject}
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Post Project
            </button>
          </div>
        </div>

        {/* Right Side (Posted Projects) */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg mx-auto mt-6 overflow-auto border-2 md:ml-2 md:mr-5">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center ">
            Posted Projects
          </h2>

          <div className="space-y-4">
            {postedProjects.length === 0 ? (
              <p className="text-center text-gray-500">
                No projects posted yet.
              </p>
            ) : (
              postedProjects.map((project) => (
                <div
                  key={project._id}
                  className="p-4 border border-gray-300 rounded-md shadow-md"
                >
                  <h3 className="text-xl font-semibold text-blue-600">
                    {project.title}
                  </h3>
                  <div className="flex justify-start space-x-2 ">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-md  hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProject;
