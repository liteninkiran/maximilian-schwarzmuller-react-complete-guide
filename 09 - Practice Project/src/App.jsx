import { useState } from 'react';

import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import SelectedProject from './components/SelectedProject';

function App() {
    const initialState = {
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    }
    const [projectsState, setProjectsState] = useState(initialState);
    const handleStartAddProject = () => setProjectsState(prev => ({ ...prev, selectedProjectId: null }));
    const handleCancelAddProject = () => setProjectsState(prev => ({ ...prev, selectedProjectId: undefined }));
    const handleSelectProject = id => setProjectsState(prev => ({ ...prev, selectedProjectId: id }));
    const handleAddProject = data => setProjectsState(prev => ({
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, { ...data, id: Math.floor(Math.random() * (10000)) }],
    }));
    const handleDeleteProject = () => setProjectsState(prev => ({
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(project => project.id !== prev.selectedProjectId),
    }));
    const handleAddTask = text => setProjectsState(prev => {
        const newTask = {
            text: text,
            projectId: prev.selectedProjectId,
            id: Math.floor(Math.random() * (10000)),
        };

        return {
            ...prev,
            tasks: [newTask, ...prev.tasks],
        };
    });
    const handleDeleteTask = id => setProjectsState(prev => ({ ...prev, tasks: prev.tasks.filter((task) => task.id !== id) }));
    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSidebar
                projects={projectsState.projects}
                selectedProjectId={1}
                onStartAddProject={handleStartAddProject}
                onSelectProject={handleSelectProject}
            />
            {
                projectsState.selectedProjectId === null ? (
                    <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
                ) : (
                    projectsState.selectedProjectId === undefined ? (
                        <NoProjectSelected onStartAddProject={handleStartAddProject} />
                    ) : (
                        <SelectedProject
                            project={selectedProject}
                            tasks={projectsState.tasks}
                            onDelete={handleDeleteProject}
                            onAddTask={handleAddTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    )
                )
            }
        </main>
    );
}

export default App;
