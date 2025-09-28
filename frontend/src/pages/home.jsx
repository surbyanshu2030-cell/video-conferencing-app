import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../styles/modern.css";
import { Button, IconButton, TextField, Card, CardContent, Typography, Chip } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const {addToUserHistory} = useContext(AuthContext);
    
    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    let handleCreateMeeting = () => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setMeetingCode(randomCode);
    }

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative'
        }}>
            {/* Modern Navigation */}
            <nav className="nav-modern" style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
            }}>
                <div className="nav-brand">
                    Apna Video Call
                </div>
                <div className="nav-links">
                    <IconButton 
                        onClick={() => navigate("/history")}
                        sx={{ 
                            color: 'white',
                            background: 'rgba(255,255,255,0.1)',
                            '&:hover': { 
                                background: 'rgba(255,255,255,0.2)',
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <HistoryIcon />
                    </IconButton>
                    <Chip 
                        label="History" 
                        sx={{ 
                            color: 'white', 
                            borderColor: 'rgba(255,255,255,0.3)',
                            '&:hover': { borderColor: 'white' }
                        }} 
                        variant="outlined" 
                    />
                    <Button 
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        startIcon={<LogoutIcon />}
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.3)',
                            '&:hover': {
                                borderColor: 'white',
                                background: 'rgba(255,255,255,0.1)'
                            }
                        }}
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            <div className="container-modern" style={{ paddingTop: '60px' }}>
                <div className="hero-section fade-in">
                    <div className="hero-content">
                        <h1 style={{ 
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '24px',
                            lineHeight: 1.2
                        }}>
                            Start Your <span style={{ 
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Video Meeting</span>
                        </h1>
                        <p style={{ 
                            fontSize: '1.25rem',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '40px',
                            lineHeight: 1.6
                        }}>
                            Connect instantly with crystal-clear video quality. 
                            Join an existing meeting or create a new one.
                        </p>

                        {/* Meeting Controls Card */}
                        <Card className="card-modern slide-up" sx={{
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            padding: '32px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            maxWidth: '500px'
                        }}>
                            <CardContent sx={{ padding: '0 !important' }}>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700,
                                    marginBottom: '24px',
                                    color: '#2d3748',
                                    textAlign: 'center'
                                }}>
                                    Join or Create Meeting
                                </Typography>
                                
                                <div style={{ marginBottom: '24px' }}>
                                    <TextField 
                                        value={meetingCode}
                                        onChange={e => setMeetingCode(e.target.value)}
                                        label="Enter Meeting Code" 
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                fontSize: '16px',
                                                '&:hover fieldset': {
                                                    borderColor: '#667eea',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#667eea',
                                                }
                                            }
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                                    <Button 
                                        onClick={handleJoinVideoCall}
                                        variant="contained"
                                        fullWidth
                                        startIcon={<VideoCallIcon />}
                                        disabled={!meetingCode.trim()}
                                        sx={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            padding: '14px 24px',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                            },
                                            '&:disabled': {
                                                background: '#e2e8f0',
                                                color: '#a0aec0'
                                            }
                                        }}
                                    >
                                        Join Meeting
                                    </Button>
                                </div>

                                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                                    <Typography variant="body2" sx={{ color: '#718096' }}>
                                        or
                                    </Typography>
                                </div>

                                <Button 
                                    onClick={handleCreateMeeting}
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<AddIcon />}
                                    sx={{
                                        borderColor: '#667eea',
                                        color: '#667eea',
                                        padding: '14px 24px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        '&:hover': {
                                            borderColor: '#667eea',
                                            background: 'rgba(102, 126, 234, 0.1)',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                >
                                    Generate New Meeting Code
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="hero-image">
                        <div style={{
                            position: 'relative',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '24px',
                            padding: '20px',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                        }}>
                            <img 
                                src='/logo3.png' 
                                alt="Video Call Logo" 
                                style={{
                                    maxWidth: '350px',
                                    height: 'auto',
                                    borderRadius: '16px'
                                }}
                            />
                            {/* Floating elements for visual appeal */}
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px',
                                animation: 'float 3s ease-in-out infinite'
                            }}>
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    margin: '60px 0',
                    padding: '0 20px'
                }}>
                    {[
                        { number: '99.9%', label: 'Uptime', icon: '' },
                        { number: '< 100ms', label: 'Latency', icon: '' },
                        { number: '256-bit', label: 'Encryption', icon: '' },
                        { number: '24/7', label: 'Support', icon: '' }
                    ].map((stat, index) => (
                        <Card key={index} className="card-modern" sx={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            textAlign: 'center',
                            padding: '24px 16px',
                            color: 'white'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 800, 
                                color: 'white',
                                marginBottom: '4px'
                            }}>
                                {stat.number}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                fontWeight: 500
                            }}>
                                {stat.label}
                            </Typography>
                        </Card>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    )
}


export default withAuth(HomeComponent)