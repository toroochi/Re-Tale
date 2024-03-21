import React, { FunctionComponent, useState, useEffect } from 'react';
import { BrowserRouter, Router, Routes, Route, Navigate, Link, useNavigate} from 'react-router-dom';
import Header from '../../parts/header/header';
import {
    onAuthStateChanged,
    signOut,
    deleteUser,
} from "firebase/auth";
import { auth } from '../../views/firebase';
import { collection, onSnapshot, query, where, DocumentData } from "firebase/firestore";
import Button, {ButtonThemes} from '../../parts/button/button';
import Novel from '../../parts/novel/novel';
import './style.css';
import {getAuth, User} from "firebase/auth";
import db from "../../views/firebase"
import { Editor, EditorState, convertToRaw, convertFromRaw} from "draft-js";
import Popup from '../../parts/popup/popup';


interface Post {
    id: string;
    content: any; // Draft.jsの形式
    title: string;
    summary: any; // Draft.jsの形式
    tags: string[];
    created: string;
    time: number;
    isCompleted: boolean;
}

const Main: FunctionComponent = () => {
    const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [usernames, setUsernames] = useState<{[key: string]: string}>({});

    const auth = getAuth();
    const user: User | null = auth.currentUser;
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [content, setContent] = useState(() => EditorState.createEmpty());

    const navigate = useNavigate();

    const fetchPosts = (isCompleted: boolean) => {
        const user = auth.currentUser;
        console.log(process.env.REACT_APP_APIKEY)
        if (user) {
            const uid = user.uid;
            const postsRef = collection(db, 'posts');
            const q = query(postsRef, where("created", "==", uid), where("isCompleted", "==", isCompleted));
            onSnapshot(q, (snapshot) => {
                const fetchedPosts = snapshot.docs
                    .map((doc) => ({ ...(doc.data() as DocumentData), id: doc.id } as Post))
                    .sort((a, b) => b.time - a.time);
                setPosts(fetchedPosts);
            });
        }
    }
    

    useEffect(() => {
        fetchPosts(true);
        // ユーザー名を取得して状態に設定
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const fetchedUsernames: {[key: string]: string} = {};
            snapshot.forEach((doc) => {
                fetchedUsernames[doc.id] = doc.data().username;
            });
            setUsernames(fetchedUsernames);
        });
        return () => unsubscribe();
    }, []);
    

    const handlePostClick = (post: Post) => {
        navigate(`/view/${post.id}`);
    }

    const handlePopupClick = (post: Post) => {
        setSelectedPost(post);
        console.log(post.summary);
    };

    const convertDraftToText = (summary: string) => {
        if (!summary) {
            return '';
            }
        
            const contentState = convertFromRaw(JSON.parse(summary));
            const editorState = EditorState.createWithContent(contentState);
            const plainText = editorState.getCurrentContent().getPlainText();
        
            return plainText.trim();
        }

    return(
        <body>
            <Header></Header>
            <div className='box'>
            <p className='title-text'>新着の小説</p>
            {posts.map((post) => {
                    return (
                        <div key={post.id}>
                            <Novel 
                                content="詳細を見る"
                                title={post.title}
                                author={usernames[post.created]}
                                className='novel'
                                tags={post.tags.map(tag => tag.text)}
                                onClick={() => handlePopupClick(post)}
                            />
                        </div>
                    );
                })}

                {selectedPost && (
                    <Popup
                        title={selectedPost.title}
                        content={convertDraftToText(selectedPost.summary)}
                        onClose={() => setSelectedPost(null)}
                        onClick={() => handlePostClick(selectedPost)}
                    />
                )}
            
            </div>
        </body>
    )
}

export default Main;
