"use client"
// ProjectDetailPage.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ProjectDetailPage = ({ params }) => {
    const { slug } = params;
    const [selectedProject, setSelectedProject] = useState(null);
    const [serviceData, setServiceData] = useState([]);
    useEffect(() => {
      const fetchProject = async () => {
        try {
          const response = await axios.get('/api/projects');
          const projectsData = response.data.data;
          // Find the project with the matching slug
          const project = projectsData.find(p => p.slug === slug);
          setSelectedProject(project);
          console.log(project)
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
  
      if (slug) {
        fetchProject();
      }
    }, [slug]);
    useEffect(() => {
        if (selectedProject) {
            setServiceData(selectedProject.services);
        }
    }, [selectedProject]);
    useEffect(() => {
        let chartInstance = null; // Declare chart instance variable
    
        if (serviceData.length > 0) {
            const ctx = document.getElementById('serviceChart');
    
            // Check if chart instance exists, destroy it if yes
            if (chartInstance) {
                chartInstance.destroy();
            }
    
            if (ctx) {
                const serviceLabels = serviceData.map(service => service.name);
                const serviceCPUData = serviceData.map(service => service.specs.cpu);
                const serviceMemoryData = serviceData.map(service => service.specs.memory);
    
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: serviceLabels,
                        datasets: [
                            {
                                label: 'CPU',
                                data: serviceCPUData,
                                borderColor: '#6366F1',
                                backgroundColor: (context) => {
                                    const ctx = context.chart.ctx;
                                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                    gradient.addColorStop(0, '#6366F1');
                                    gradient.addColorStop(1, '#fff');
                                    return gradient;
                                },
                                borderWidth: 2,
                                pointRadius: 5,
                                lineTension: 0.5,
                                pointBackgroundColor: '#fff',
                                borderDash: [],
                                fill: true,
                            },
                            {
                                label: 'Memory',
                                data: serviceMemoryData,
                                borderColor: '#6366F1',
                                backgroundColor: (context) => {
                                    const ctx = context.chart.ctx;
                                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                    gradient.addColorStop(0, '#6366F1');
                                    gradient.addColorStop(1, '#fff');
                                    return gradient;
                                },
                                borderWidth: 2,
                                pointRadius: 5,
                                lineTension: 0.5,
                                pointBackgroundColor: '#fff',
                                borderDash: [],
                                fill: true,
                            }
                            
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                            x: {
                                display: false // Hide x-axis labels
                            }
                        }
                    }
                });
            }
        }
    
        // Return a cleanup function to destroy the chart instance when component unmounts
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [serviceData]); // Include serviceData as dependency
    
   
    
  return (
    <div className="container mx-auto ">
    <h1 className="text-3xl font-bold mb-4">Project Detail</h1>
    {selectedProject ? (
        <div className='grid col-span-2'>
            <div className="bg-white rounded-lg shadow-md p-4 w-[50%]">
                <h2 className="text-xl font-semibold mb-2">{selectedProject.name}</h2>
                <div className="flex flex-wrap">
                    <div className="w-full p-2">
                        <div className="bg-gray-100 p-4 rounded-md">
                            <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                            <p className="text-gray-600">Type: {selectedProject.services[0].type}</p>
                            <p className="text-gray-600">CPU: {selectedProject.services[0].specs.cpu}</p>
                            <p className="text-gray-600">Memory: {selectedProject.services[0].specs.memory}</p>
                            <p className="text-gray-600">Disk: {selectedProject.services[0].specs.disk}</p>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table-auto mt-8">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Service Name</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">CPU</th>
                        <th className="px-4 py-2">Memory</th>
                        <th className="px-4 py-2">Disk</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedProject.services.map((service, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{service.name}</td>
                            <td className="border px-4 py-2">{service.type}</td>
                            <td className="border px-4 py-2">{service.specs.cpu}</td>
                            <td className="border px-4 py-2">{service.specs.memory}</td>
                            <td className="border px-4 py-2">{service.specs.disk}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="bg-white rounded-lg shadow-md p-4 mt-8 w-full h-96">
    <h2 className="text-xl font-semibold mb-2">Service Data</h2>
    <canvas id="serviceChart"  ></canvas>
</div>
        </div>
    ) : (
        <p>Loading...</p>
    )}
</div>
  );
};

export default ProjectDetailPage;
