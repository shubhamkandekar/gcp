"use client"


import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <Link href={`/dashboard/${project.slug}`} passHref>
            
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <div className="flex flex-wrap">
                  <div className="w-full p-2">
                    <div className="bg-gray-100 p-4 rounded-md">
                      <h4 className="text-md font-semibold mb-2">Specifications</h4>
                      <p className="text-gray-600">Type: {project.services[0].type}</p>
                      <p className="text-gray-600">CPU: {project.services[0].specs.cpu}</p>
                      <p className="text-gray-600">Memory: {project.services[0].specs.memory}</p>
                      <p className="text-gray-600">Disk: {project.services[0].specs.disk}</p>
                    </div>
                  </div>
                </div>
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
