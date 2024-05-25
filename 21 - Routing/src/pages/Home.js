import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const navigateHandler = () => navigate('products');

    return (
        <>
            <h1>My Home Page</h1>
            <p>
                <button onClick={navigateHandler}>Go to PRODUCTS</button>
            </p>
        </>
    );
}

export default HomePage;
