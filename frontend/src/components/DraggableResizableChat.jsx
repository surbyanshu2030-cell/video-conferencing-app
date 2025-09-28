import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from '../styles/draggableChat.module.css';

const DraggableResizableChat = ({ 
    messages, 
    message, 
    setMessage, 
    sendMessage, 
    onClose, 
    isVisible 
}) => {
    // Detect mobile screen
    const isMobile = window.innerWidth <= 768;
    
    const [position, setPosition] = useState({ 
        x: isMobile ? 10 : window.innerWidth - 360, 
        y: isMobile ? 10 : 20 
    });
    const [size, setSize] = useState({ 
        width: isMobile ? Math.min(window.innerWidth - 20, 300) : 320, 
        height: isMobile ? Math.min(window.innerHeight - 140, 350) : 400 
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
    
    const chatRef = useRef(null);
    const headerRef = useRef(null);
    const resizeHandleRef = useRef(null);

    // Drag functionality
    const handleMouseDown = (e) => {
        if (e.target === headerRef.current || headerRef.current.contains(e.target)) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
            const newY = Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragStart.y));
            setPosition({ x: newX, y: newY });
        }
        
        if (isResizing) {
            const newWidth = Math.max(280, Math.min(600, resizeStart.width + (e.clientX - resizeStart.x)));
            const newHeight = Math.max(300, Math.min(800, resizeStart.height + (e.clientY - resizeStart.y)));
            setSize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    // Resize functionality
    const handleResizeMouseDown = (e) => {
        e.stopPropagation();
        // Disable resize on mobile for better UX
        if (window.innerWidth <= 768) return;
        
        setIsResizing(true);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height
        });
    };

    // Handle window resize to keep chat box in bounds and adjust for mobile
    useEffect(() => {
        const handleWindowResize = () => {
            const isMobileNow = window.innerWidth <= 768;
            
            // Adjust size for mobile
            if (isMobileNow) {
                setSize({
                    width: Math.min(window.innerWidth - 20, 300),
                    height: Math.min(window.innerHeight - 140, 350)
                });
                setPosition({
                    x: 10,
                    y: 10
                });
            } else {
                // Desktop positioning
                setPosition(prev => ({
                    x: Math.min(prev.x, window.innerWidth - size.width),
                    y: Math.min(prev.y, window.innerHeight - size.height)
                }));
            }
        };

        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [size]);

    // Add global mouse event listeners
    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, dragStart, resizeStart]);

    // Handle Enter key for sending messages
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={chatRef}
            className={styles.draggableChat}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                cursor: isDragging ? 'grabbing' : 'default'
            }}
        >
            {/* Header with drag handle */}
            <div 
                ref={headerRef}
                className={styles.chatHeader}
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                <div className={styles.headerContent}>
                    <DragIndicatorIcon className={styles.dragIcon} />
                    <h3>Chat</h3>
                </div>
                <IconButton 
                    onClick={onClose}
                    className={styles.closeButton}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            </div>

            {/* Chat messages area */}
            <div className={styles.chatMessages}>
                {messages.length !== 0 ? messages.map((item, index) => (
                    <div key={index} className={styles.messageItem}>
                        <p className={styles.messageSender}>{item.sender}</p>
                        <p className={styles.messageText}>{item.data}</p>
                    </div>
                )) : (
                    <div className={styles.noMessages}>
                        <p>No messages yet</p>
                        <p>Start the conversation!</p>
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className={styles.chatInput}>
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    maxRows={3}
                    className={styles.messageInput}
                />
                <Button
                    variant="contained"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className={styles.sendButton}
                >
                    Send
                </Button>
            </div>

            {/* Resize handle */}
            <div
                ref={resizeHandleRef}
                className={styles.resizeHandle}
                onMouseDown={handleResizeMouseDown}
            />
        </div>
    );
};

export default DraggableResizableChat;