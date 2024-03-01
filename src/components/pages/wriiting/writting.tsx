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

const getStrTime = (time: number): string => {
    let t = new Date(time);
    return (`${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`);
}


const Writting: FunctionComponent = () => {
    const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [usernames, setUsernames] = useState<{[key: string]: string}>({});

    const auth = getAuth();
    const user: User | null = auth.currentUser;
    
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [content, setContent] = useState(() => EditorState.createEmpty());
    

    const fetchPosts = (isCompleted: boolean) => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const postsRef = collection(db, 'posts');
            const q = query(postsRef, where("created", "==", uid), where("isCompleted", "==", isCompleted));
    
            onSnapshot(q, (snapshot) => {
                const fetchedPosts = snapshot.docs
                    .map((doc) => ({ ...(doc.data() as DocumentData), id: doc.id } as Post))
                    .sort((a, b) => b.time - a.time);
                console.log(fetchedPosts);
                setPosts(fetchedPosts);
            });
        }
    }

    
    useEffect(() => {
        fetchPosts(isCompleted);
        // ユーザー名を取得して状態に設定
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            const fetchedUsernames: {[key: string]: string} = {};
            snapshot.forEach((doc) => {
                fetchedUsernames[doc.id] = doc.data().username;
            });
            setUsernames(fetchedUsernames);
        });
        return () => unsubscribe();
    }, [isCompleted]);

    const handlePostClick = (post: Post) => {
        console.log(post);
        if (post.isCompleted) {
            navigate(`/view/${post.id}`);
        } else {
            navigate(`/writtingform/${post.id}`);
        }
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
                <p className='context'>物語を執筆する</p>
                <div className="containerbutton">
                    <Button children="執筆中" onClick={() => setIsCompleted(false)}></Button>
                    <Button children="投稿済み" onClick={() => setIsCompleted(true)}></Button>
                    <Button children="続けた物語"></Button>
                </div>
                {posts.map((post) => (
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
                ))}

                {selectedPost && (
                    <Popup
                        title={selectedPost.title}
                        content={convertDraftToText(selectedPost.summary)}
                        onClose={() => setSelectedPost(null)}
                        onClick={() => handlePostClick(selectedPost)}
                    />
                )}

                <div style={{position: 'fixed', right: '20px', bottom: '20px'}}>
                <Link to={"/writtingform"}><Button children="執筆" theme={ButtonThemes.CIRCLE} className='post-button' ></Button></Link>
                </div>
            </div>
        </body>
    )
}

export default Writting;
