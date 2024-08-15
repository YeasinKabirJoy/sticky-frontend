import styles from '../css/Login.module.css'; 
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokens } from '../utils';

const LoginPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check if access token exists

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const formSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/login/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      saveTokens(data.tokens.access,data.tokens.refresh)
      navigate('/')
      
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

  return (
    
    <div className={styles.align}>

<div className={styles.componentContainer}>
    <div className={styles.grid}>
      <form className={`${styles.form} ${styles.login}`}>

        <div className={styles.form__field}>
          <label htmlFor="login__email">
            <svg className={styles.icon}>
              <use xlinkHref="#icon-user"></use>
            </svg>
            <span className={styles.hidden}>Email</span>
          </label>
          <input
            autoComplete="email"
            id="login__emeil"
            type="email"
            name="email"
            className={styles.form__input}
            placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />
        </div>

        <div className={styles.form__field}>
          <label htmlFor="login__password">
            <svg className={styles.icon}>
              <use xlinkHref="#icon-lock"></use>
            </svg>
            <span className={styles.hidden}>Password</span>
          </label>
          <input
            id="login__password"
            type="password"
            name="password"
            className={styles.form__input}
            placeholder="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            required
          />
        </div>

        <div className={styles.form__field}>
          <input type="submit" value="Sign In" onClick={formSubmit}/>
        </div>
      </form>

      <p className={styles.text__center}>
        Not a member? <a href="#">Sign up now</a>
        <svg className={styles.icon}>
          <use xlinkHref="#icon-arrow-right"></use>
        </svg>
      </p>


      <div className={styles.socialLogin}>
        <p className={styles.socialLogin__title}>Or sign in with</p>
        <div className={styles.socialLogin__links}>
            <a href="#" className={`${styles.socialLogin__link} ${styles.socialLogin__link_google}`}>
            Sign in with Google
            </a>
            <a href="#" className={`${styles.socialLogin__link} ${styles.socialLogin__link_facebook}`}>
            Sign in with Facebook
            </a>
        </div>
       </div>



    </div>

    </div>


    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icons}>
      <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
        <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
      </symbol>
      <symbol id="icon-lock" viewBox="0 0 1792 1792">
        <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
      </symbol>
      <symbol id="icon-user" viewBox="0 0 1792 1792">
        <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
      </symbol>
    </svg>
  </div>
  )
}

export default LoginPage