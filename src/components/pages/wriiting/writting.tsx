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

    const auth = getAuth();
    const user: User | null = auth.currentUser;
    
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
    }, [isCompleted]);
    
    const handlePostClick = (post: Post) => {
        console.log(post);
        if (post.isCompleted) {
            navigate(`/view/${post.id}`);
        } else {
            navigate(`/writtingform/${post.id}`);
        }
    }

    const convertDraftToText = (draft: any) => {
        if (!draft || !draft.blocks) {
            return '';
        }
        const text = draft.blocks.map((block: any) => {
            console.log(block);  // ブロックの内容をログに出力
            return block.text;
        }).join('\n');
        return text;
    }
    
    return(
        <body>
            <Header></Header>
            <div className='box'>
                <p className='context'>あなたの物語</p>
                <div className="containerbutton">
                    <Button children="執筆中" onClick={() => setIsCompleted(false)}></Button>
                    <Button children="投稿済み" onClick={() => setIsCompleted(true)}></Button>
                    <Button children="続けた物語"></Button>
                    {posts.map((post) => (
                        <button onClick={() => handlePostClick(post)}>aaa</button>
                    ))}
                </div>
                {posts.map((post) => (
                <Novel 
                    key={post.id}
                    link={`/writtingform/${post.id}`}
                    content="編集する"
                    title={post.title}
                    summary={convertDraftToText(post.summary)}
                    author={post.created}
                    className='novel'
                    tags={post.tags}
                />
            ))}
                <div style={{position: 'fixed', right: '20px', bottom: '20px'}}>
                <Link to={"/writtingform"}><Button children="執筆" theme={ButtonThemes.CIRCLE} className='post-button' ></Button></Link>
                </div>
            </div>
        </body>
    )
}

export default Writting;
