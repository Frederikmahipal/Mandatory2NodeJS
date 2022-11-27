<script>
    import { navigate } from "svelte-navigator";
    import {BASE_URL} from '../../stores/globals.js';
    import { toast } from '@zerodevx/svelte-toast'
    
    let name = ""
    let email = ""
    let password = ""
    let errorMessage = ""


    const signUp = async () => {
        
            const res = await fetch(`${$BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, name, password }),
            credentials: "include"
        })
        if (res.status === 200){
            navigate('/auth/login')
            toast.push('user created')
        } else {
            res.status === 404
            errorMessage = await res.json();
            toast.push('email already exist')

        }
    }
</script>

<div>
    <h1>Signup</h1>
    <form on:submit|preventDefault={signUp}>
        <label for="name">Name</label>
        <input bind:value={name} id="name" name="name" placeholder="name" type="text">

        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="e@mail.com" type="email">

        <label for="password">Password</label>
        <input bind:value={password} id="password" name="password" placeholder="****" type="password">

        <button>Signup</button>
    </form>
    <p><a href="/auth/login"> Already have an account?</a></p>
</div>