import { Navbar, SideNav, Wrapper } from "@/Components/compIndex";
import { FolderGit2, Timer, Users, BarChart } from "lucide-react";

const Projects = () => {
  const projectFeatures = [
    "Project Timeline Tracking",
    "Team Collaboration Tools",
    "Resource Management",
    "Performance Analytics",
  ];

  return (
    <>
      <SideNav />
      <Navbar />
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <div className="animate-bounce mb-8">
            <FolderGit2 className="w-16 h-16 text-purple-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Project Management Hub
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Your central workspace for managing projects and tracking team
            progress. Enhanced features coming to streamline your workflow.
          </p>

          <div className="bg-purple-50 rounded-lg p-6 mb-8 max-w-md w-full">
            <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center justify-center gap-2">
              <Timer className="w-5 h-5" />
              Upcoming Features
            </h2>
            <ul className="space-y-3">
              {projectFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Users className="w-4 h-4 text-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-pulse flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            <span>Under Development</span>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Projects;
