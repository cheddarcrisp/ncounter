<div class="about">
    <button class="close" on:click={ () => { dispatch('close'); } }><i class="material-icons">close</i></button>
    <header>
        <h1>NCounter</h1>
        <h2>Release |BUILD_DATE|</h2>
        <h2>&copy; |BUILD_YEAR|</h2>
    </header>
    <div class="repo">
        <a href="https://github.com/cheddarcrisp/ncounter" rel="noopener external" target="_blank"><img src="{ GitHubIcon }" alt="GitHub">Source Code</a>
        <a href="https://github.com/cheddarcrisp/ncounter/issues" rel="noopener external" target="_blank"><img src="{ GitHubIcon }" alt="GitHub">Issues and feedback</a>
    </div>
    <h3>Privacy Policy</h3>
    <p>No cookies. No tracking. All data is stored on your device.
        Everything you do with this application is private.</p>
    <div class="licenses">
        <h2>Open Source License Information</h2>
        <Licenses></Licenses>
    </div>
</div>
<script>
import Licenses from './Licenses.svelte';
import { createEventDispatcher } from 'svelte';
import GitHubIcon from '../img/GitHub-Mark.png';

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

.repo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 6px 0;
    flex: none;
}

.repo > a {
    display: inline-flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.87);
    text-decoration: none;
    padding: 5px;
    background-color: #F0F0F0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border: 2px solid transparent;
}

.repo > a:hover, .repo > a:focus {
    box-shadow: none;
    border-color: var(--highlight-color);
}

.repo > a > img {
    width: 24px;
    height: 24px;
    margin-right: 4px;
}

h1 {
    font-weight: 600;
    font-size: 24px;
}

h2 {
    font-size: 18px;
}

h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 12px 0 6px 0;
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