import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";

function Feed() {
    const [posts, setPosts] = useState([]);
    // const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        //fetch('https://pacific-peak-30751.herokuapp.com/post')
        fetch('http://localhost:5000/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    }, [posts])

    // const toggleSidebar = () => {
    //     setIsSidebarVisible(!isSidebarVisible);
    // };

    return (
        <div className="feed">
            <div className="feed__header">
               
                <h2>
                {/* <button className="hamburger-btn" onClick={toggleSidebar}>
                    ☰ 
                </button> */}
                Home</h2>
            </div>
            <TweetBox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>
    )
}

export default Feed;
