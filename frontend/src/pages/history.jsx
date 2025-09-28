import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { IconButton, Container, Box } from '@mui/material';
import "../styles/modern.css";

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    let formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px 0'
        }}>
            <Container maxWidth="md" className="fade-in">
                {/* Header */}
                <div className="history-header" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '24px 32px',
                    marginBottom: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <IconButton 
                        onClick={() => routeTo("/home")}
                        sx={{ 
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            marginRight: '16px',
                            '&:hover': { 
                                background: 'rgba(255, 255, 255, 0.3)',
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h4" className="history-title" style={{ 
                        color: 'white',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <CalendarTodayIcon sx={{ fontSize: 32 }} />
                        Meeting History
                    </Typography>
                </div>

                {/* Meetings List */}
                <Box>
                    {meetings.length !== 0 ? (
                        <div style={{
                            display: 'grid',
                            gap: '20px'
                        }}>
                            {meetings.map((meeting, index) => (
                                <Card key={index} className="meeting-card slide-up" sx={{
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                    }
                                }}>
                                    <CardContent sx={{ padding: '24px' }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'flex-start',
                                            marginBottom: '16px'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    borderRadius: '12px',
                                                    padding: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <VideoCallIcon sx={{ color: 'white', fontSize: 24 }} />
                                                </div>
                                                <div>
                                                    <Typography variant="h6" className="meeting-code" sx={{
                                                        fontWeight: 700,
                                                        color: '#2d3748',
                                                        fontSize: '18px',
                                                        marginBottom: '4px'
                                                    }}>
                                                        Meeting: {meeting.meetingCode}
                                                    </Typography>
                                                    <Typography variant="body2" className="meeting-date" sx={{
                                                        color: '#718096',
                                                        fontSize: '14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}>
                                                        📅 {formatDate(meeting.date)} at {formatTime(meeting.date)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => routeTo(`/${meeting.meetingCode}`)}
                                                variant="contained"
                                                size="small"
                                                startIcon={<VideoCallIcon />}
                                                sx={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    padding: '8px 16px',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                                    }
                                                }}
                                            >
                                                Join Again
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card sx={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            padding: '48px',
                            textAlign: 'center'
                        }}>
                            <div style={{ 
                                fontSize: '64px', 
                                marginBottom: '24px',
                                opacity: 0.6
                            }}>
                                📹
                            </div>
                            <Typography variant="h5" sx={{ 
                                fontWeight: 700,
                                color: '#2d3748',
                                marginBottom: '12px'
                            }}>
                                No Meeting History
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#718096',
                                marginBottom: '32px'
                            }}>
                                Your meeting history will appear here once you join or create meetings.
                            </Typography>
                            <Button
                                onClick={() => routeTo("/home")}
                                variant="contained"
                                startIcon={<VideoCallIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    padding: '12px 24px',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                    }
                                }}
                            >
                                Start Your First Meeting
                            </Button>
                        </Card>
                    )}
                </Box>
            </Container>
        </div>
    )
}