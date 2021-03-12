import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPost } = useSelector((state) => state.post);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPost.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
