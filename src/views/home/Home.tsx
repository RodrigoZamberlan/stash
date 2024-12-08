import { UserContext } from "../../contexts/UserContext";

const Home: React.FC = () => {
    let currentUser = { firstname: "Rodrigo", lastname: "Freddo", email: "rodrigo@gmail.com", password: "123"};

    return <UserContext.Provider value={currentUser}>
        <>Home component</>
    </UserContext.Provider>
}

export default Home;