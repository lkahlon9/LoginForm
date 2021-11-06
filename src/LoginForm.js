import {useState} from 'react';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (event) => {
        
        setCredentials({email: credentials.email, password: event.target.value});

        if(event.target.value.length === 0){
            setPasswordError('Empty password');
        } else {
            setPasswordError('');
        }
    }

    const handleEmailChange = (event) => {

        setCredentials({email: event.target.value, password: credentials.password});

        const parsedEmail = event.target.value.split('@');
        let isValid;
        if(parsedEmail.length === 2){
            if(parsedEmail[0].length > 0 && !parsedEmail[0].includes(" ") 
                && parsedEmail[1].length > 0 && !parsedEmail[1].includes(" ")){
                    const parsedDomain = parsedEmail[1].split('.');
                    if(parsedDomain.length === 2){
                        if(parsedDomain[0].length > 0 && !parsedDomain[0].includes(" ")
                            && parsedDomain[1].length > 0 && !parsedDomain[1].includes(" ")){
                                isValid = true;
                            } else {
                                isValid = false;
                            }
                    } else {
                        isValid = false;
                    }
            } else {
                isValid = false;
            }
        } else {
            isValid=false;
        }

        if(isValid) setEmailError('');
        else setEmailError('Invalid email');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(emailError === '' && passwordError === '' 
            && credentials.email !== '' && credentials.password !== ''){
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://reqres.in/api/login");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4){
                        console.log(xhr.response);
                    }
                };

                xhr.send(JSON.stringify(credentials));

                setCredentials({email: '', password: ''});
        } else {
            if(credentials.email === '') setEmailError('Invalid email');
            if(credentials.password === '') setPasswordError('Empty password');
        }
        
    }

    return (
        <form>
            <label htmlFor="email">Email</label>
            <input onChange={handleEmailChange} type="email" data-testid="email" value={credentials.email} />
            <div className="error-msg">
                <p data-testid="email-error">{emailError}</p>
            </div>
            <label htmlFor="password">Password</label>
            <input onChange={handlePasswordChange} type="password" data-testid="password" value={credentials.password} />
            <div className="error-msg">
                <p data-testid="password-error">{passwordError}</p>
            </div>
            <div className="submit-button">
                <button onClick={handleSubmit} data-testid="submit">Submit</button>
            </div>
        </form>
        
    );
}

export default LoginForm;