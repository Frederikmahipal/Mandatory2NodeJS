<script>
    import { navigate } from 'svelte-navigator';
    import {BASE_URL} from '../../stores/globals.js';
    import {token} from '../../stores/globals';
    import { toast } from '@zerodevx/svelte-toast'
    import Mail from './mail.svelte'
    let email = ""
    let name = ""
    let password = ""
   

   export const login = async () => {
    
        const res = await fetch(`${$BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, name, password}),
            credentials: "include"
        })
        if (res.status === 200){
            const tokenValue = '23432'
            localStorage.setItem('token', tokenValue)
            token.set(localStorage.getItem('token'))
            navigate("/homepage")
            toast.push('signed in')
        } else {
            res.status === 404
            toast.push('login failed')
        }
    }
  

</script>

<div>
    <h1>Login</h1>
    <form on:submit|preventDefault={login}>
        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="e@mail.com" type="email">

        <label for="password">Password</label>
        <input bind:value={password} autocomplete="current-password" id="password" name="password" placeholder="****" type="password">

        <button type="submit">Login</button>

    </form>
    <p><a href="/auth/register">Click here to signup </a></p>
    <Mail/>
</div>