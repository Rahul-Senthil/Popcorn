import axios from 'axios';
import React, { Component } from 'react';
import { createBrowserHistory as history} from 'history';
import jwtDecode from 'jwt-decode';

const Account = () => {

    const email = React.createRef();
    const username = React.createRef();
    const password = React.createRef();

    const loginEmail = React.createRef();
    const loginPassword = React.createRef();

    const handleRegister = async(e) =>{
        e.preventDefault();
        const newUser = {
            email: email.current.value,
            username: username.current.value,
            password: password.current.value 
        }

        await axios.post("https://popcorn-movie-review.herokuapp.com/add-user", newUser)
        .then(res => {
            console.log(res.data);
            var jwt = res.data.token;
            console.log(jwt);
            localStorage.setItem('myToken', jwt);
            window.location.href = '/';
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        const loginUser = {
            email: loginEmail.current.value,
            password: loginPassword.current.value 
        }

        await axios.post("https://popcorn-movie-review.herokuapp.com/login", loginUser)
        .then(res => {
            var jwt = res.data.token;
            console.log(jwt);
            localStorage.setItem('myToken', jwt);
            // var jwt1 = localStorage.getItem('myToken');
            // const user = jwtDecode(jwt1);
            // console.log(user.currentUser);
            window.location.href = '/';
            // console.log(user.email);
            // console.log(loginEmail.current.value);
            // if(user.email === loginEmail.current.value)
            // {
            //     // history.push("/review");
            //     window.location.href = "/review";
            //     console.log("hey");
            // }
            // else
            // {
            //     console.log("hey no");
            // }
        })
        .catch(err => {
            console.log(err);
        })
    }




    return ( 
        <div>
        <div className='container col-lg-3'>
        <h1>Sign Up</h1>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={email}/>
                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div class="form-group">
                <label for="exampleInputName">Name</label>
                <input type="text" class="form-control" id="exampleInputName" placeholder="Name" ref={username}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ref={password}/>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary" onClick={handleRegister}>Submit</button>
        </form>
        </div>
        <div className='container col-lg-3'>
            <br />
            <br />
        <h1>Sign In</h1>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={loginEmail}/>
                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ref={loginPassword}/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={handleLogin}>Submit</button>
        </form>
        </div>
        </div>
     );
}
 
export default Account;