import { useEffect, useState } from 'react';
import CustomNavbar from './CustomNavbar';

const AdminProject = () => {
  // Single state object to manage the project data
  const [project, setProject] = useState({
    imageUrl: '',
    heading: '',
    shortDescription: '',
    longDescription: '',
    by: ''
  });

  // State to store posted projects fetched from API
  const [postedProjects, setPostedProjects] = useState([]);

  // Handle change for any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  // Handle form submission (console log for now)
  const handlePostProject = async () => {
    try {
      // Simulate posting the project (In real app, you would send this to the API)
      setPostedProjects([...postedProjects, project]);
      console.log('Project posted successfully:', project);
    } catch (error) {
      console.log(error);
    }
  };

  // API to fetch posted projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://iisppr-backend.vercel.app/project/all');
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        
      
        const projectHeadings = data.map(project => ({
          heading: project.heading
        }));

        setPostedProjects(projectHeadings);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="flex w-full h-screen">
        {/* Left Side (Form for Admin) */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg mx-auto mt-6 border-2 ml-5">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Create New Project</h2>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={project.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
          </div>

          {/* Project Heading */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">Project Heading</label>
            <input
              type="text"
              name="heading"
              value={project.heading}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write heading for project"
            />
          </div>

          {/* Short Description */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={project.shortDescription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Intern management system: a platform for managing intern"
            />
          </div>

          {/* Long Description */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">Long Description</label>
            <textarea
              name="longDescription"
              value={project.longDescription}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write description about the project"
            />
          </div>

          {/* By (Team Name) */}
          <div className="mb-4">
            <label className="block text-blue-600 font-medium mb-2">BY</label>
            <input
              type="text"
              name="by"
              value={project.by}
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
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Posted Projects</h2>

          <div className="space-y-4">
            {postedProjects.length === 0 ? (
              <p className="text-center text-gray-500">No projects posted yet.</p>
            ) : (
              postedProjects.map((project, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-md shadow-md">
                  <h3 className="text-xl font-semibold text-blue-600">{project.heading}</h3>
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
