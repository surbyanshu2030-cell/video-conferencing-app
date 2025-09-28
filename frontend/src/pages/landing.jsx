import React, { useState } from 'react'
import "../styles/modern.css"
import { Link, useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography } from '@mui/material'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import GroupIcon from '@mui/icons-material/Group'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import AddIcon from '@mui/icons-material/Add'

export default function LandingPage() {
    const router = useNavigate();
    const [guestDialogOpen, setGuestDialogOpen] = useState(false);
    const [meetingCode, setMeetingCode] = useState("");

    const handleGuestJoin = () => {
        if (!meetingCode.trim()) return;
        router(`/${meetingCode}`);
        setGuestDialogOpen(false);
    }

    const handleCreateGuestMeeting = () => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setMeetingCode(randomCode);
    }

    const features = [
        {
            icon: <VideoCallIcon sx={{ fontSize: 40 }} />,
            title: "HD Video Calls",
            description: "Crystal clear video quality for seamless communication"
        },
        {
            icon: <GroupIcon sx={{ fontSize: 40 }} />,
            title: "Group Meetings",
            description: "Connect with multiple people at once"
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: "Secure & Private",
            description: "End-to-end encryption for your privacy"
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40 }} />,
            title: "Lightning Fast",
            description: "Instant connection with minimal latency"
        }
    ];

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(213, 203, 203, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
            }}></div>
            
            <nav className="nav-modern" style={{ background: 'rgba(227, 75, 75, 0.1)' }}>
                <div style={{ 
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#00bcd4'
                }}>
                    🎥 Video Call
                </div>
                <div className="nav-links">
                    <Button 
                        className="btn-modern btn-secondary"
                        onClick={() => setGuestDialogOpen(true)}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                    >
                        Join as Guest
                    </Button>
                    <Button 
                        className="btn-modern btn-secondary"
                        onClick={() => router("/auth")}
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                    >
                        Register
                    </Button>
                    <Button 
                        className="btn-modern btn-primary"
                        onClick={() => router("/auth")}
                        variant="contained"
                        sx={{ 
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Login
                    </Button>
                </div>
            </nav>

            <div className="container-modern">
                <div className="hero-section fade-in">
                    <div className="hero-content">
                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: '24px',
                            color: 'white'
                        }}>
                            Connect with your love ones
                        </h1>
                        <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
                            Experience crystal-clear video calls with advanced features. 
                            Connect instantly, share screens, and stay close to what matters most.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                            <Button
                                component={Link}
                                to="/auth"
                                variant="contained"
                                size="large"
                                sx={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    padding: '16px 32px',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    boxShadow: '0 8px 32px rgba(240, 147, 251, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 40px rgba(240, 147, 251, 0.6)'
                                    }
                                }}
                            >
                                Get Started Free
                            </Button>
                            <Button
                                onClick={() => setGuestDialogOpen(true)}
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    padding: '16px 32px',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: 'white',
                                        background: 'rgba(255,255,255,0.1)',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                Quick Join
                            </Button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div style={{
                            position: 'relative',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '24px',
                            padding: '20px',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <img 
                                src="/mobile.png" 
                                alt="Video Call Interface" 
                                style={{
                                    maxWidth: '400px',
                                    height: 'auto',
                                    borderRadius: '16px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div style={{ 
                    padding: '80px 0',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    margin: '40px 0',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        color: 'white', 
                        fontSize: '2.5rem', 
                        fontWeight: 700,
                        marginBottom: '48px'
                    }}>
                        Why Choose Apna Video Call?
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '32px',
                        padding: '0 32px'
                    }}>
                        {features.map((feature, index) => (
                            <div key={index} className="card-modern slide-up" style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                textAlign: 'center',
                                padding: '32px 24px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ 
                                    color: '#f093fb', 
                                    marginBottom: '16px',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ 
                                    color: 'white', 
                                    fontSize: '1.25rem', 
                                    fontWeight: 600,
                                    marginBottom: '12px'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ 
                                    color: 'rgba(255,255,255,0.8)', 
                                    fontSize: '14px',
                                    lineHeight: 1.6
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Guest Join Dialog */}
            <Dialog 
                open={guestDialogOpen} 
                onClose={() => setGuestDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    textAlign: 'center', 
                    fontWeight: 700, 
                    fontSize: '1.5rem',
                    color: '#2d3748',
                    paddingBottom: '8px'
                }}>
                    Join Meeting as Guest
                </DialogTitle>
                <DialogContent sx={{ padding: '20px 24px' }}>
                    <Typography variant="body2" sx={{ 
                        color: '#718096', 
                        textAlign: 'center', 
                        marginBottom: '24px' 
                    }}>
                        Enter a meeting code to join or create a new meeting
                    </Typography>
                    
                    <TextField 
                        value={meetingCode}
                        onChange={e => setMeetingCode(e.target.value.toUpperCase())}
                        label="Meeting Code" 
                        variant="outlined"
                        fullWidth
                        placeholder="Enter 6-digit code"
                        sx={{
                            marginBottom: '20px',
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
                    
                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                            or
                        </Typography>
                    </div>
                    
                    <Button 
                        onClick={handleCreateGuestMeeting}
                        variant="outlined"
                        fullWidth
                        startIcon={<AddIcon />}
                        sx={{
                            borderColor: '#667eea',
                            color: '#667eea',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: '#667eea',
                                background: 'rgba(102, 126, 234, 0.1)'
                            }
                        }}
                    >
                        Generate New Meeting Code
                    </Button>
                </DialogContent>
                <DialogActions sx={{ padding: '0 24px 24px 24px', gap: '12px' }}>
                    <Button 
                        onClick={() => setGuestDialogOpen(false)}
                        sx={{ 
                            color: '#718096',
                            textTransform: 'none',
                            fontWeight: 600
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleGuestJoin}
                        variant="contained"
                        disabled={!meetingCode.trim()}
                        startIcon={<VideoCallIcon />}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                transform: 'translateY(-1px)',
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
                </DialogActions>
            </Dialog>
        </div>
    )
}