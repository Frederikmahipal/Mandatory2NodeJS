<script>
    import {navigate} from "svelte-navigator";
    import {BASE_URL} from '../../stores/globals.js';
    import {clearToken} from '../../stores/globals.js';
    import { toast } from '@zerodevx/svelte-toast'
    


    const logOut = () => {
        fetch(`${$BASE_URL}/destroysession`,{
            method: 'GET',
            credentials: 'include'
        })
        toast.push('successfully signed out')
        clearToken()
        setTimeout(() => {
            navigate('/auth/login')
                location.reload()
            }, 1000
        )
    }
</script>

<h1>Welcome</h1>


<button on:click={logOut} class="button1">Logout</button>
