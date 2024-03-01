import React from 'react';
import './style.css';

interface PopupProps {
    title: string;
    content: string;
    onClose: () => void;
    onClick?: () => void;
}

const Popup: React.FC<PopupProps> = ({ content, onClose, title, onClick }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="close-btn" onClick={onClose}>×</div>
                <div className="popup">
                    <div className='title-box'>
                    <p className='title'>{title}</p>
                    </div>
                    <div><p className='summary'>{content}</p></div>
                    <button onClick={onClick} className='bottom-btn'>中身を見る</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
