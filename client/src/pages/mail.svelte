<script>
    import {BASE_URL} from "../../stores/globals";
    import { toast } from '@zerodevx/svelte-toast'


    let email = ''
    
    const submit = async () => {
        await fetch(`${$BASE_URL}/passwordreset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email}),
            credentials: "include"
        })
        toast.push('check your email')
    }

</script>

<div>
    <form on:submit|preventDefault={submit}>
        <label for="email">Email</label>
        <input bind:value={email} id="email" placeholder="e@mail.com" type="email">
        <button type="submit">Reset password</button>
    </form>
</div>