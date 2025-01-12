import { useNavigate } from "react-router-dom";
import Header from "../header/Header"
import Button from "../button/Button";

const HeaderPosts: React.FC = () => {
    const navigate = useNavigate();

    return <Header>
        <Button styleType="link" handleClick={() => { navigate('/posts-dashboard') }}>Posts</Button>
        <Button styleType="link" handleClick={() => { navigate('/category-create') }}>Categories</Button>
        <Button styleType="link" handleClick={() => { navigate('/tag-create') }}>Tags</Button>
    </Header>
}

export default HeaderPosts;