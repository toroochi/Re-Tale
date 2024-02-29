import {useState, useEffect} from 'react';
import './style.css';
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import { Editor, EditorState, ContentState, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import firebase from 'firebase/compat';
import {collection,addDoc,doc,getDoc, updateDoc,onSnapshot} from "firebase/firestore"
import db from "../../views/firebase"
import { auth } from "../../views/firebase";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WithOutContext as ReactTags } from 'react-tag-input';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Button, {ButtonThemes} from '../../parts/button/button';
import Input, {InputThemes} from '../../parts/input/input';
import Header from '../../parts/header/header';

import "draft-js/dist/Draft.css";


const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface ITag {
    id: string;
    text: string;
}

const Writtingform = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(() => EditorState.createEmpty());;
    const [postId, setPostId] = useState<string | null>("");
    const [isCompleted, setCompleted] = useState(false);
    const location = useLocation();
    const {id} = useParams();
    const [tags, setTags] = useState<ITag[]>([]);
    const [summaryEditorState, setSummaryEditorState] = useState(() => EditorState.createEmpty());

    const handleDelete = (i: number) => {
        setTags(tags.filter((tag, index) => index !== i));
    }

    const handleAddition = (tag: ITag) => {
        if (tag.text.length <= 10) {
            setTags((prevTags) => [...prevTags, tag]); 
        } else {
            alert("タグは10文字以下である必要があります");
        }
    }
    

    useEffect(() => {
        const fetchPosts = async () =>{
            if (id) {
                const postDox = await getDoc(doc(db,'posts', id));
                if (postDox.exists()){
                    const postData = postDox.data();
                    setTitle(postData.title);
                    setContent(postData.content);
                    setPostId(id);
    
                    // postData.contentをエディターに反映
                    const contentState = ContentState.createFromText(postData.content);
                    const newEditorState = EditorState.createWithContent(contentState);
                    setEditorState(newEditorState);
                }
            }
        };
        fetchPosts();
        if (location.pathname === "/writting"){
            setPostId(null);
        }
    }, [location, postId]);
    

    const savePost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const userId = auth?.currentUser?.uid;
        if (!userId) {
            // ユーザーが存在しない場合の処理を書く
            return;
        }
        try {
            if (postId) {
                //既存の投稿を更新
                await updateDoc(doc(db, "posts", postId),{
                    title: title,
                    content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                    summary: JSON.stringify(convertToRaw(summaryEditorState.getCurrentContent())),
                    tags: tags,
                });
            }else{
                //新しい投稿を作成
                console.log('Title before saving:', title);

                const docRef = await addDoc(collection(db, "posts"),{
                    created: userId,
                    time: new Date().getTime(),
                    title: title,
                    content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                    summary: JSON.stringify(convertToRaw(summaryEditorState.getCurrentContent())),
                    tags: tags,
                    isCompleted: false
                });
                setPostId(docRef.id)//新しく作成した投稿のIDを保存
            }
            toast.success("保存しました！")
        } catch (error) {
            console.log(error);
            toast.error("保存に失敗しました。")
        }
    };
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );
    const submitPost = async () => {
        const yesNoFlg = window.confirm("投稿してもよろしいですか？");
        if (yesNoFlg) {
            // contentとtitleが空でないことを確認
            if (!content || !title) {
                toast.error("内容とタイトルを入力してください。");
                return;
            }
    
            const userId = auth?.currentUser?.uid;
            if (!userId) {
                // ユーザーが存在しない場合の処理を書く
                return;
            }
            try {
                if (postId) {
                    // 既存の投稿を更新
                    const postRef = doc(db, "posts", postId);
                    await updateDoc(postRef, {
                        title: title,
                        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                        summary: JSON.stringify(convertToRaw(summaryEditorState.getCurrentContent())),
                        isCompleted: true,
                        time:new Date().getTime(),
                        tags: tags,
                    });
                } else {
                    // 新しい投稿を作成
                    const postsCollection = collection(db, "posts");
                    
                    const docRef = await addDoc(postsCollection, {
                        title: title,
                        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                        created: userId,
                        isCompleted: true,
                        time:new Date().getTime(),
                        summary: JSON.stringify(convertToRaw(summaryEditorState.getCurrentContent())),
                        tags: tags,
                    });
                    setPostId(docRef.id); // 新しく作成した投稿のIDを保存
                }
                
                toast.success("投稿しました！");
    
                // contentとtitleを空にし、postIdをnullに設定
                setContent(EditorState.createEmpty());
                setSummaryEditorState(EditorState.createEmpty());
                setTags([]);
                setTitle("");
                setPostId(null);
            } catch (error) {
                console.log(error);
                toast.error("保存に失敗しました。")
            }
        }
    }
    

    return(
        <body>
            <Header></Header>
            <div className='box'>
                <p className='context'>物語を執筆する</p>
                <Input 
                    theme={InputThemes.SQUARE} 
                    placeholder="タイトルを入力してください" 
                    className='input' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                    <div className='editorContainer'>
                        <Editor
                            placeholder="本文を入力してください"
                            editorState={editorState}
                            onChange={setEditorState}
                        />
                    </div>
                    <div className='editorContainer'>
                        <Editor
                            placeholder="あらすじを入力してください(任意)"
                            editorState={summaryEditorState}
                            onChange={setSummaryEditorState}
                        />
                    </div>
                    <div className='react-tag-input__tag__content'>
                    <DndProvider backend={HTML5Backend}>
                        <ReactTags 
                            tags={tags}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            delimiters={delimiters}
                            labelField="text"
                            placeholder='タグの追加(任意)'
                            allowDragDrop={false}
                            inline={false}
                        />
                    </DndProvider>
                    </div>
                    <div className='savebutton' style={{textAlign: 'center'}}>
                        <Button onClick={submitPost} children="投稿"></Button>
                    </div>
                    <div style={{position: 'fixed', right: '20px', bottom: '20px'}}>
                        <Button onClick={savePost} children="保存" theme={ButtonThemes.CIRCLE} className='post-button'></Button>
                    </div>
            </div>
            <ToastContainer />
        </body>
    )
}

export default Writtingform;
