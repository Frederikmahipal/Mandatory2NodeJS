<script>
    import {Route, Router} from 'svelte-navigator';
    import {token} from '../../stores/globals.js';

    import Login from '../pages/login.svelte'
    import Register from '../pages/register.svelte'
    import Homepage from '../pages/homepage.svelte'

    $: authenticated = $token


</script>


<Router>
    <Route path='/auth/login'>
        <Login/>
    </Route>
    <Route path='/auth/register'>
        <Register/>
    </Route>
    {#if authenticated}
    <Route path='/homepage'>
        <Homepage/>
    </Route>
    {/if}
</Router>