import NoProjectSelected from './components/NoProjectSelected';
import NewProject from './components/NewProject';
import ProjectsSidebar from './components/ProjectsSidebar';
import { useState } from 'react';

function App() {
    const initialState = {
        selectedProjectId: undefined,
        projects: [],
    }
    const [projectsState, setProjectsState] = useState(initialState);
    const handleStartAddProject = () => setProjectsState(prev => ({ ...prev, selectedProjectId: null }));
    const handleAddProject = (data) => {
        const newProject = { ...data, id: Math.floor(Math.random() * (10000)) }
        setProjectsState(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    }
    console.log(projectsState);
    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSidebar onStartAddProject={handleStartAddProject} />
            {
                projectsState.selectedProjectId === null ? (
                    <NewProject onAdd={handleAddProject} />
                ) : (
                    <NoProjectSelected onStartAddProject={handleStartAddProject} />
                )
            }
            
        </main>
    );
}

export default App;
