import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Editor, EditorState,convertFromRaw,convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import firebase from 'firebase/compat';
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, query, where, QuerySnapshot, DocumentData } from "firebase/firestore"
import db from "../../views/firebase"
import { auth } from "../../views/firebase";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../parts/header/header';
import { ContentBlock } from 'draft-js';
import Button from '../../parts/button/button';

interface Contribution {
    userIds: string[];
    contributionContents: string[];
}

const View = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [postId, setPostId] = useState<string | null>(null);
    const location = useLocation();
    const { id } = useParams();
    const [contributionContent, setContributionContent] = useState<string>("");
    const [contributionContents, setContributionContents] = useState<string[]>([]);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [editorState, setEditorState] = useState<EditorState>(
        () => EditorState.createEmpty()
    );

    useEffect(() => {
        const fetchPosts = async () => {
            if (id) {
                const postDoc = await getDoc(doc(db, 'posts', id));
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setTitle(postData.title);
                
                    const contentText = convertDraftToText(postData.content);
                    setContent(contentText);

                    setPostId(id);
                    console.log("postData.content:", postData.content);
                    console.log("postData.content.blocks:", postData.content?.blocks);
                }
            }

            const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query(collection(db, 'contributions'), where('postId', '==', id)));
            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                const postData = docSnapshot.data() as Contribution;

                const promises = postData.userIds.map(async (userId) => {
                    const userDoc = await getDoc(doc(db, 'users', userId));
                    return userDoc.exists() ? userDoc.data()?.username : null;
                });

                const resolvedUsernames = await Promise.all(promises);
                setUsernames(resolvedUsernames.filter((username): username is string => !!username));

                setContributionContents(postData.contributionContents);
            }
        }

        fetchPosts();
        if (location.pathname === "/home") {
            setPostId(null);
        }
    }, [id, location.pathname]);

    const convertEditorStateToJSON = (editorState: EditorState) => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        return JSON.stringify(rawContentState);
    };
    

    const handleEditorChange = (editorState: EditorState) => {
        setEditorState(editorState);
        const text = editorState.getCurrentContent().getPlainText();
        setContributionContent(text);
    };

    const handlePost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const yesNoFlg = window.confirm("投稿してもよろしいですか？");
        if (yesNoFlg) {
            if (!contributionContent) {
                toast.error("内容を入力してください。");
                return;
            }
            const userId = auth.currentUser?.uid;
            if (!userId) {
                toast.error("ログインしていません。");
                return;
            }
    
            try {
                // EditorStateオブジェクトをJSON形式に変換
                const editorStateJSON = convertEditorStateToJSON(editorState);
    
                const querySnapshots = await getDocs(query(collection(db, 'contributions'), where('postId', '==', id)));
                if (!querySnapshots.empty) {
                    const docSnapshot = querySnapshots.docs[0];
                    const postData = docSnapshot.data() as Contribution;
                    await updateDoc(doc(db, 'contributions', docSnapshot.id), {
                        contributionContents: [...postData.contributionContents, editorStateJSON],
                        userIds: [...postData.userIds, userId]
                    });
                } else {
                    const docRef = await addDoc(collection(db, "contributions"), {
                        userIds: [userId],
                        contributionContents: [editorStateJSON],
                        postId: id,
                    });
                    setPostId(docRef.id);
                }
                toast.success("投稿しました！");
                setEditorState(EditorState.createEmpty());
                setContributionContent("");
                setPostId(null);
    
                const querySnapshot = await getDocs(query(collection(db, 'contributions'), where('postId', '==', id)));
                if (!querySnapshot.empty) {
                    const docSnapshot = querySnapshot.docs[0];
                    const postData = docSnapshot.data() as Contribution;
                    const promises = postData.userIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(db, 'users', userId));
                        return userDoc.exists() ? userDoc.data()?.username : null;
                    });
                    const resolvedUsernames = await Promise.all(promises);
                    setUsernames(resolvedUsernames.filter((username): username is string => !!username));
                    setContributionContents(postData.contributionContents);
                }
            } catch (error) {
                console.log(error);
                toast.error("投稿に失敗しました。");
            }
        }
    };
    

    const convertDraftToText = (content: string) => {
        if (!content) {
            return '';
            }
        
            const contentState = convertFromRaw(JSON.parse(content));
            const editorState = EditorState.createWithContent(contentState);
            const plainText = editorState.getCurrentContent().getPlainText();
        
            return plainText.trim();
        }

        const convertDraftcontributeToText = (contributionContent: string) => {
            if (!contributionContent) {
                return '';
                }
            
                const contentState = convertFromRaw(JSON.parse(contributionContent));
                const editorState = EditorState.createWithContent(contentState);
                const plainText = editorState.getCurrentContent().getPlainText();
            
                return plainText.trim();
            }

    return (
        <body>
            <Header></Header>
            <ToastContainer />
            <div className='box'>
                <form onSubmit={handlePost}>
                    <p className='context'>物語を執筆する</p>
                    <div className='title-box'>
                    <p className='title-text'>{title}</p>
                    </div>
                    <p className='content-text'>{content.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                    ))}</p>
                    <hr />
                    <div className='content-text'>
                        {usernames.map((username, index) => (
                            <p key={index}>{username} : {convertDraftcontributeToText(contributionContents[index])}</p>
                        ))}
                    </div>
                    <hr />
                    <div className='editorContainer'>
                        <Editor
                            placeholder="ここから入力を行ってください。"
                            editorState={editorState}
                            onChange={handleEditorChange}
                        />
                    </div>
                    <div className='savebutton' style={{textAlign: 'center'}}>
                        <Button onClick={handlePost} children="投稿"></Button>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default View;
