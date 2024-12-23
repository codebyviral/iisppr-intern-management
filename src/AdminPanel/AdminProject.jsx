/* eslint-disable no-unused-vars */
import { stringify } from 'postcss';
import React, { useState } from 'react';

const AdminProject = () => {
  // Single state object to manage the project data
  const [project, setProject] = useState({
    imageUrl: '',
    heading: '',
    shortDescription: '',
    longDescription: '',
    by: ''
  });

  // Handle change for any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  // Handle form submission (console log for now)
  const handlePostProject = async() => {
    try {
        const response = await fetch('api/postProject',{
            method :'POST',
            headers :{
                'Content-type' :'application/json',
            },
            body:JSON.stringify(project),
        });
        const result = await response.json();
        console.log("Project posted successfully:", result);
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div className="w-full md:w-1/2 mx-auto p-6 bg-white shadow-lg rounded-lg">
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
  );
};

export default AdminProject;
