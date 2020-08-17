<?php 

session_start();

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<link rel='shortcut icon' href='./src/images/icon.ico'/>
		<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>

		<link href='src/styles/login.css' rel='stylesheet'>
		<title>Sol Nascente</title>
	</head>
	<body>
		<div id='logoDiv'></div>
		<div id='mainDiv'>		
			<form method='post' onsubmit="return false">
				<div id='formDiv'>
					<p>Login</p>
					<input type='text' name='_cpg' id='cpf' placeholder='cpf' autocomplete='off' required>
					<input type='password' name='_password' id='password' placeholder='senha' required>
                    <input type='submit' id='submit' value='Login!' onclick="ValidateLogin()">
				</div>
			</form>
		</div>
		<script>
			async function ValidateLogin(){
				let cpf = document.getElementById('cpf').value
				let password = document.getElementById('password').value

				const payload = JSON.stringify({ cpf, password })

				let response= await fetch('http://18.222.162.205:3000/auth', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},  
				method: 'post',
				body: payload,
				})

				if((response.status === 200 || response.status === 201) && response.status != 401){
					response = await response.json()
					document.cookie = "id =" + response.id
					document.cookie = "accessToken =" + response.token
					document.cookie = "permission =" + response.profile;
					//window.location = 'http://18.222.162.205/panel'
					window.location = 'http://18.222.162.205/panel'
				}else{
					alert("Senha ou CPF inválidos")
				}
			}
		</script>
	</body>
</html>