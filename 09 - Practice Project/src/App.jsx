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
        const id = Math.floor(Math.random() * (10000));
        const newProject = { ...data, id }
        setProjectsState(prev => ({
            ...prev,
            selectedProjectId: undefined,
            projects: [...prev.projects, newProject],
        }));
    }
    const handleCancelAddProject = () => {
        setProjectsState(prev => ({
            ...prev,
            selectedProjectId: undefined,
        }));
    }
    return (
        <main className='h-screen my-8 flex gap-8'>
            <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
            {
                projectsState.selectedProjectId === null ? (
                    <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
                ) : (
                    <NoProjectSelected onStartAddProject={handleStartAddProject} />
                )
            }
            
        </main>
    );
}

export default App;
