import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import axios, { AxiosError } from 'axios';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import styles from './Login.module.css';
//import { PREFIX } from '../../helpers/API';
//import { LoginResponse } from '../../interfaces/auth.interface';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';


export type LoginForm = {
    email : {
        value: string;
    },
    password: {
        value: string;
    }
}

const Login = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (event: FormEvent) => {
		event.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = event.target as typeof event.target & LoginForm;
		const { email, password } = target;
		await dataAuthentication(email.value, password.value);
	};

	const dataAuthentication = async (email: string, password: string) => {
		dispatch(login({email, password}));
        
		// try {
		// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {email, password});
		// 	dispatch(userActions.addJWT(data.access_token));
		// 	navigate('/');    
		// } catch (error) {
		// 	if (error instanceof AxiosError) {
		// 		setError(error.response?.data.message);
		// 	}
		// }
	};

	return (
		<div className={styles.formWrapper}>
			<Title>Log In</Title>
			{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
			<form onSubmit={submit}>
				<label className={styles.input}> Your Email<br />
					<Input name="email" type="email" placeholder="Email" />
				</label>
				<label className={styles.input}> Your Password<br />
					<Input name="password" type="password" placeholder="Password" />
				</label>
				<div className={styles.formBottom}>
					<Button type="submit" appearence="big">Enter</Button>
					<div className={styles.underText}>
                        No account yet?<br />
						<Link to="/auth/register">Reset password</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;