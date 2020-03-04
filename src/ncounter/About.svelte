<div class="about">
    <button class="close" on:click={ () => { dispatch('close'); } }><i class="material-icons">close</i></button>
    <header>
        <h1>NCounter</h1>
        <h2>Release |BUILD_DATE|</h2>
        <h2>&copy; James Hollenbeck |BUILD_YEAR|</h2>
    </header>
    <div class="licenses">
        <h2>Open Source License Information</h2>
        <Licenses></Licenses>
    </div>
</div>
<script>
import Licenses from './Licenses.svelte';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>
<style>
.about {
    background-color: var(--background-primary);
    color: var(--text-primary);

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    overflow: auto;

    padding: 5px;
}

.about > header {
    flex: center;
    text-align: center;
}

h1 {
    font-weight: 600;
    font-size: 24px;
}

h2 {
    font-size: 18px;
}

.licenses h2{
    font-weight: 600;
}

.close {
    position: absolute;
    top: 0;
    right: 0;
}

.licenses {
    margin-top: 32px;
}
</style>