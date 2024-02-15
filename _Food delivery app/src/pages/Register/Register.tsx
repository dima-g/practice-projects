import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import axios, { AxiosError } from 'axios';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import styles from '../Login/Login.module.css';
//import { PREFIX } from '../../helpers/API';
//import { LoginResponse } from '../../interfaces/auth.interface';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';


export type RegisterForm = {
    email : {
        value: string;
    },
    password: {
        value: string;
    }
    name: {
        value: string;
    }
}

const Register = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (event: FormEvent) => {
		event.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = event.target as typeof event.target & RegisterForm;
		const { email, password, name } = target;
		dispatch(register({email: email.value, password: password.value, name: name.value}));
	};

	return (
		<div className={styles.formWrapper}>
			<Title>Sign up</Title>
			{registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
			<form onSubmit={submit}>
				<label className={styles.input}> Your Email<br />
					<Input name="email" type="email" placeholder="Email" />
				</label>
				<label className={styles.input}> Your Password<br />
					<Input name="password" type="password" placeholder="Password" />
				</label>
				<label className={styles.input}> Your Name<br />
					<Input name="name" type="text" placeholder="Name " />
				</label>
				<div className={styles.formBottom}>
					<Button type="submit" appearence="big">Register</Button>
					<div className={styles.underText}>
                        Already have an account?<br />
						<Link to="/auth/login">Log in</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;