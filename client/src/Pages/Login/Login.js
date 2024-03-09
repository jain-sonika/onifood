import React, { useState } from 'react'
import axios from 'axios'
import "./Login.css"


function Login() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	const loginFunction = (e) => {
		e.preventDefault()

		let obj = {
			email: email,
			password: password
		}

		axios.post("http://localhost:3001/loginUser", obj).then((res) => {
			localStorage.setItem("token", res.data.data.token)
			localStorage.setItem("user", JSON.stringify(res.data.data))
			localStorage.setItem("shopId", res.data.data.shopId)
			window.location.replace("/home")

		}).catch((err) => { alert(err.response.data.message) })
	}


	return (
		<div className='main-div'>
			<div className="container h-100">
				<div className="d-flex justify-content-center h-100">
					<div className="user_card">
						<div className="d-flex justify-content-center">
							<div className="brand_logo_container">
								<img src="https://i.pinimg.com/originals/b1/fc/bb/b1fcbbfd4fb8116c714ef352bb39bbaf.jpg" className="brand_logo" alt="Logo" />
							</div>
						</div>
						<div className="d-flex justify-content-center form_container">
							<form>
								<div className="input-group mb-3">
									<div className="input-group-append">
										<span className="input-group-text"><i className="fas fa-user"></i></span>
									</div>
									<input type="text" className="form-control input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
								<div className="input-group mb-2">
									<div className="input-group-append">
										<span className="input-group-text"><i className="fas fa-key"></i></span>
									</div>
									<input type="password" className="form-control input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>
								<div className="form-group">
									<div className="custom-control custom-checkbox">
										<input type="checkbox" className="custom-control-input" id="customControlInline" />
										<label className="custom-control-label" for="customControlInline">Remember me</label>
									</div>
								</div>
								<div className="d-flex justify-content-center mt-3 login_container">
									<button id='loginBtn' type="button" name="button" className="btn login_btn" onClick={loginFunction}>Login</button>
								</div>
							</form>
						</div>

						<div className="mt-4">
							<div className="d-flex justify-content-center links ele">
								Don't have an account? <a href="/register">Sign Up</a>
							</div>
							<div className="d-flex justify-content-center links ele">
								<a href="#">Forgot your password?</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Login
