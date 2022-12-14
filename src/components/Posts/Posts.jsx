import React, {useEffect} from 'react';
import "./Posts.css"
import Post from "../Post/Post";
import {useDispatch, useSelector} from "react-redux";
import {getAllLatestPosts, getSomeonePostsByUsername} from "../../actions/PostAction";
import {useLocation, useParams} from "react-router-dom";
import {getUserById} from "../../actions/UserAction";

const Posts = () => {
    const dispatch = useDispatch()
    let {posts, loading} = useSelector((state) => state.postReducer)
    let {user} = useSelector((state) => state.userReducer)
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        if (params.id !== null && params.id !== undefined) {
            dispatch(getUserById(params.id))
            dispatch(getSomeonePostsByUsername(user.username))
        } else {
            dispatch(getAllLatestPosts())
        }
    }, [dispatch, params.id]);

    return (<>
            {location.pathname.includes("profile") ?
                <div className={"Posts"}>
                    {loading ? "Fetching Posts..." : posts && posts.content.length > 0 ?
                        posts.content.filter(post => post.authorId == params.id).map((post, id) => {
                            return <Post data={post} key={id}/>
                        }) : "No posts"}
                </div> :
                <div className={"Posts"}>
                    {loading ? "Fetching Posts..." : posts && posts.content.length > 0 ?
                        posts.content.map((post, id) => {
                            return <Post data={post} key={id}/>
                        }) : "No posts"}
                </div>
            }
        </>
    );
};

export default Posts;
