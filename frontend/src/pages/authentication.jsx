import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Alert, Card, CardContent } from '@mui/material';
import "../styles/modern.css";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <CssBaseline />
            
            <Card className="fade-in" sx={{
                maxWidth: '450px',
                width: '100%',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ padding: '48px 40px' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Avatar sx={{ 
                            m: '0 auto 16px auto', 
                            width: 64, 
                            height: 64,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}>
                            {formState === 0 ? <LoginIcon sx={{ fontSize: 32 }} /> : <PersonAddIcon sx={{ fontSize: 32 }} />}
                        </Avatar>
                        <Typography variant="h4" sx={{ 
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '8px'
                        }}>
                            {formState === 0 ? 'Welcome Back' : 'Join Us Today'}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            color: '#718096',
                            fontSize: '16px'
                        }}>
                            {formState === 0 ? 'Sign in to continue to your account' : 'Create your account to get started'}
                        </Typography>
                    </div>

                    {/* Tab Switcher */}
                    <div style={{ 
                        display: 'flex', 
                        marginBottom: '32px',
                        background: '#f7fafc',
                        borderRadius: '12px',
                        padding: '4px'
                    }}>
                        <Button 
                            onClick={() => { setFormState(0); setError(""); }}
                            sx={{
                                flex: 1,
                                padding: '12px 24px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '14px',
                                background: formState === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                                color: formState === 0 ? 'white' : '#718096',
                                '&:hover': {
                                    background: formState === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'
                                }
                            }}
                        >
                            Sign In
                        </Button>
                        <Button 
                            onClick={() => { setFormState(1); setError(""); }}
                            sx={{
                                flex: 1,
                                padding: '12px 24px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '14px',
                                background: formState === 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                                color: formState === 1 ? 'white' : '#718096',
                                '&:hover': {
                                    background: formState === 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                    </div>

                    {/* Form */}
                    <Box component="form" noValidate>
                        {formState === 1 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Full Name"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                sx={{
                                    marginBottom: '20px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '&:hover fieldset': { borderColor: '#667eea' },
                                        '&.Mui-focused fieldset': { borderColor: '#667eea' }
                                    }
                                }}
                            />
                        )}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                marginBottom: '20px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' }
                                }
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                marginBottom: '24px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' }
                                }
                            }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ 
                                marginBottom: '20px',
                                borderRadius: '12px',
                                '& .MuiAlert-message': { fontSize: '14px' }
                            }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={handleAuth}
                            startIcon={formState === 0 ? <LoginIcon /> : <PersonAddIcon />}
                            sx={{
                                padding: '16px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: 600,
                                textTransform: 'none',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)'
                                }
                            }}
                        >
                            {formState === 0 ? "Sign In" : "Create Account"}
                        </Button>

                        {formState === 0 && (
                            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                <Typography variant="body2" sx={{ color: '#718096' }}>
                                    Don't have an account?{' '}
                                    <Link 
                                        component="button" 
                                        variant="body2" 
                                        onClick={() => setFormState(1)}
                                        sx={{ 
                                            color: '#667eea',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Sign up here
                                    </Link>
                                </Typography>
                            </div>
                        )}

                        {formState === 1 && (
                            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                <Typography variant="body2" sx={{ color: '#718096' }}>
                                    Already have an account?{' '}
                                    <Link 
                                        component="button" 
                                        variant="body2" 
                                        onClick={() => setFormState(0)}
                                        sx={{ 
                                            color: '#667eea',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Sign in here
                                    </Link>
                                </Typography>
                            </div>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setOpen(false)} 
                    severity="success" 
                    sx={{ 
                        borderRadius: '12px',
                        '& .MuiAlert-message': { fontSize: '14px' }
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}