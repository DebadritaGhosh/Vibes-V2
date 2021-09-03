import React, { useState } from 'react'
//importing Style
import "./LoginScreen.scss";
//Importing Assets
import loginImage from "../../assets/login.svg";
import ring1 from "../../assets/ring1.svg";
//Importing Firebase
import { auth, googleProvider } from "../../firebase";
import db from "../../firebase";
//Modal
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: '55%',
        minHeight: 550,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #5137ed',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //Register
    const [openRegister, setOpenRegister] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    //Forget Password
    const [openForgetPassword, setOpenForgetPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [buttonName, setButtonName] = useState("Reset Password")
    //Modal Style
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const signInWithGoogle = async () => {
        try {
            const res = await auth.signInWithPopup(googleProvider);
            const user = res.user;
            const query = await db
                .collection("users")
                .where("uid", "==", user.uid)
                .get();
            if (query.docs.length === 0) {
                await db.collection("users").add({
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const signInWithEmailAndPassword = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleRegister = async (event) => {
        try {
            const res = await auth.createUserWithEmailAndPassword(registerEmail, registerPassword);
            const user = res.user;
            await db.collection("users").add({
                uid: user.uid,
                name: registerName,
                authProvider: "local",
                email: registerEmail,
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        setOpenRegister(false);
    }

    const handleForgetPassword = async () => {
        try {
            await auth.sendPasswordResetEmail(forgotEmail);
            alert("Password reset link sent!");
            setOpenForgetPassword(false);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        <div className="login">
            {/* Registration Modal Start */}
            <Modal
                open={openRegister}
                onClose={() => setOpenRegister(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="login__modal-form">
                        <h1 className="login__modal-logo">Vibes</h1>
                        <div className="login__modal-inputContainer">
                            <p>Name</p>
                            <input type="text" placeholder="First Name Only" onChange={e => setRegisterName(e.target.value)} />
                        </div>
                        <div className="login__modal-inputContainer">
                            <p>Email</p>
                            <input type="text" placeholder="debadrita@gmail.com" onChange={e => setRegisterEmail(e.target.value)} />
                        </div>
                        <div className="login__modal-inputContainer">
                            <p>Password</p>
                            <input type="password" placeholder="Min. 8 character" onChange={e => setRegisterPassword(e.target.value)} />
                        </div>
                        <button onClick={() => handleRegister()}>Sign Up</button>
                    </div>
                </div>
            </Modal>
            {/* Registration Modal End */}
            {/* Forget Password Modal Start */}
            <Modal
                open={openForgetPassword}
                onClose={() => setOpenForgetPassword(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="login__modal-form">
                        <h1 className="login__modal-logo">Vibes</h1>
                        <div className="login__modal-inputContainer">
                            <p>Email</p>
                            <input type="text" placeholder="Please enter your email" onChange={e => setForgotEmail(e.target.value)} />
                        </div>
                        <button onClick={() => handleForgetPassword()}>{buttonName}</button>
                    </div>
                </div>
            </Modal>
            {/* Forget Password Modal End */}
            <div className="login__left">
                <h2 className="login__logo">Vibes</h2>
                <img src={loginImage} alt="img" />
            </div>
            <div className="login__right">
                <img className="ring1" src={ring1} alt="ring" />
                <img className="ring2" src={ring1} alt="ring" />
                <div className="login__headerContainer">
                    <h1 >Login.</h1>
                    <p>Let music flow in your heart and enrich your soul</p>
                </div>
                <div className="login__form">
                    <div className="login__loginWithGoogle" onClick={signInWithGoogle}>
                        <img src="https://pngimg.com/uploads/google/google_PNG19635.png" alt="google" />
                        <h4>Sign in with Google</h4>
                    </div>

                    <p className="login__divider"> or Sign in with Email</p>
                    <div className="login__InputContainer">
                        <p className="login__InputTitle">Email</p>
                        <input type="text" placeholder="debadrita@gmail.com" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="login__InputContainer">
                        <p className="login__InputTitle">Password</p>
                        <input type="password" placeholder="Min. 8 character" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <p className="login__bottomText"><span onClick={() => setOpenForgetPassword(true)}>Forget Password?</span></p>
                    <p className="login__bottomText">Don't Have an account? <span onClick={() => setOpenRegister(true)}> Sign Up</span></p>
                    <button onClick={() => signInWithEmailAndPassword(email, password)}> Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
