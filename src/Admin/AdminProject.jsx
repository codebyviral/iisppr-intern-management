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
  const [editProjectId, setEditProjectId] = useState(null);
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
      // Set loading state to true while posting
      setLoading(true);
  
      // Create a FormData object to handle the file upload along with other data
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("subTitle", project.subTitle);
      formData.append("description", project.description);
      formData.append("image", project.image); // Assuming project.image is a file object
      formData.append("createdBy", project.createdBy);
  
      // API call to submit the project
      const response = await fetch("https://iisppr-backend.vercel.app/project/submit", {
        method: "POST",
        body: formData, // Use formData as the body
      });
  
      if (!response.ok) {
        throw new Error("Failed to post the project");
      }
  
      const data = await response.json(); // Assuming the API returns the project data
  
      // Update the posted projects with the newly added project
      setPostedProjects([...postedProjects, data]);
  
      console.log("Project posted successfully:", data);
  
      // Clear the form or reset project state if necessary
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
      setLoading(false); // Set loading state to false after the request is completed
    }
  };
  
  const handleDelete = async (ProjectId) => {
    
    try {
      const response = await fetch(
        `https://iisppr-backend.vercel.app/project/delete/${ProjectId}`,
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
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

 
  
  const updateProject = async (editProjectId) => {
  
    try {
      const response = await fetch(
        `https://iisppr-backend.vercel.app/project/update/${editProjectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        }
      );

      if (!response.ok) throw new Error("Failed to update project");
      const updatedProject = await response.json();

      setPostedProjects(
        postedProjects.map((proj) =>
          proj._id === editProjectId ? updatedProject : proj
        )
      );
      console.log("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      console.log("Error updating project:", error);
      if(updateProject.status==500){
        alert('500')
      };
      
    }
    
  };

  // API to fetch posted projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://iisppr-backend.vercel.app/project/all"
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

  // const openEditModal = (projectId) => {
  //   const selectedProject = postedProjects.find(
  //     (proj) => proj._id === projectId
  //   );
  //   if (selectedProject) {
  //     setProject(selectedProject);
  //     setEditProjectId(projectId);
  //   }
  // };

  return (
    <>
      <CustomNavbar />
      <div className="flex w-full h-screen">
        {/* Left Side (Form for Admin) */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg mx-auto mt-6 border-2 ml-5">
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
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg mx-auto mt-6 overflow-auto border-2 ml-2 mr-5">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Posted Projects
          </h2>

          <div className="space-y-4">
            {postedProjects.length === 0 ? (
              <p className="text-center text-gray-500">
                No projects posted yet.
              </p>
            ) : (
              postedProjects.map((project) => (
                (console.log(project._id)),
                <div
                  key={project._id}
                  
                  className="p-4 border border-gray-300 rounded-md shadow-md"
                >
                  <h3 className="text-xl font-semibold text-blue-600">
                    {project.title}
                  </h3>
                  <div className="flex justify-end space-x-2 mt-2">
                    {/* <button
                      onClick={() => openEditModal(project._id)}
                      className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300"
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

     
      {/* Modal for Editing Project */}
      {editProjectId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
              Edit Project
            </h2>
            <form onSubmit={updateProject(editProjectId)}>
              {/* Modal Form Fields */}
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleChange}
                  placeholder="Project Title"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Sub Title
                </label>
                <input
                  type="text"
                  name="subTitle"
                  value={project.subTitle}
                  onChange={handleChange}
                  placeholder="Sub Title"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-600 font-medium mb-2">
                  Created By
                </label>
                <input
                  type="text"
                  name="createdBy"
                  value={project.createdBy}
                  onChange={handleChange}
                  placeholder="Created By"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Update Project
                </button>
                <button
                  type="button"
                  onClick={() => setEditProjectId(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProject;
