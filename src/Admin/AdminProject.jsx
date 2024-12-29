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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );
  
    if (!confirmDelete) {
      return; // Exit the function if the user cancels the delete operation
    }
  
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
      <div className="flex flex-col w-full h-auto md:flex-row md:h-screen">
        {/* Left Side (Form for Admin) */}
        <div className="w-full p-6 mx-auto mt-6 bg-white border-2 rounded-lg shadow-lg md:w-1/2 md:ml-5 md:mr-2">
          <h2 className="mb-4 text-2xl font-semibold text-center text-blue-600">
            Create New Project
          </h2>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-blue-600">
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
            <label className="block mb-2 font-medium text-blue-600">
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
            <label className="block mb-2 font-medium text-blue-600">
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
            <label className="block mb-2 font-medium text-blue-600">
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
            <label className="block mb-2 font-medium text-blue-600">
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
              className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Post Project
            </button>
          </div>
        </div>

        {/* Right Side (Posted Projects) */}
        <div className="w-full p-6 mx-auto mt-6 overflow-auto bg-white border-2 rounded-lg shadow-lg md:w-1/2 md:ml-2 md:mr-5">
          <h2 className="mb-4 text-2xl font-semibold text-center text-blue-600 ">
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
                      className="px-4 py-1 text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
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
