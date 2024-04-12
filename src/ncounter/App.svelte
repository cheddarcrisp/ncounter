<div class="app">
    <div class="counter-list">
        {#each $counters as counter}
        <Counter counterId={ counter.id }></Counter>
        {/each}
    </div>
    {#if showUpdateMessage}
    <div class="update-message">
        An update is available. <button class="reload" on:click="{ () => { window.location.reload(); } }">Load now</button><button class="later" on:click="{ () => { showUpdateMessage = false; } }">Later</button>
    </div>
    {/if}
    <div class="tool-bar">
        <button class="add" on:click="{ showAdd }"><span class="material-symbols-outlined">add</span></button>
        {#if updateAvailable}<button class="update"
            class:animate="{!ignoreUpdate}"
            on:click={() => { ignoreUpdate = true; showUpdateMessage = !showUpdateMessage; }}><span class="material-symbols-outlined">arrow_upward</span></button>{/if}
        <button class="about" on:click="{ () => { showAbout = true; } }">?</button>
    </div>
</div>
{#if showAddDialog}
<div class="dialog">
    <form class="dialog-content" novalidate bind:this={ dialogForm }>
        <label>Counter Name<input type="text" required bind:value={newCounter.title} use:focus/></label>
        <label>Initial Value<input type="text" required pattern="(0|([1-9]\d*))(\.\d+)?" inputmode="decimal" bind:value={newCounter.initialValue} /></label>
        <label>Target<input type="text" pattern="(0|([1-9]\d*))(\.\d+)?" inputmode="decimal" bind:value={newCounter.max} /></label>
        <label>Save history<input type="checkbox" bind:checked={newCounter.saveHistory} /></label>
        <div class="buttons">
            <button class="ok" on:click|preventDefault|stopPropagation={ add }>OK</button>
            <button on:click|preventDefault|stopPropagation={ () => { showAddDialog = false; } }>Cancel</button>
        </div>
    </form>
</div>
{/if}
{#if showAbout}
<About on:close="{ () => { showAbout = false; } }"></About>
{/if}
<script>
import About from './About.svelte';
import Counter from './Counter.svelte';
import { counters } from './db.js';

let showAddDialog = false;
let showAbout = false;
let newCounter = null;
let dialogForm = null;

let updateAvailable = false;
let ignoreUpdate = false;
let showUpdateMessage = false;

function focus(node){
    node.focus();
}

function showAdd(){
    newCounter = {
        title: '',
        initialValue: 0,
        max: '',
        saveHistory: false,
        history: []
    }

    showAddDialog = true;
}

function add(){
    if(!dialogForm.checkValidity()) {
        dialogForm.removeAttribute('novalidate');
        return;
    }

    const counter = {
        ...newCounter,
        max: newCounter.max !== '' ? +newCounter.max : null,
        value: +newCounter.initialValue
    }

    counters.add(counter);

    showAddDialog = false;
}

export function SetUpdateAvailable(){
    updateAvailable = true;
}
</script>
<style lang="scss">
    .app {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        z-index: 1;
    }

    .counter-list {
        padding: 5px;
        overflow: auto;
        flex: 1 0 0;

        background-color: var(--background-color);
    }

    .tool-bar {
        flex: none;

        display: flex;

        border-top: 2px solid var(--button-color);
        background-color: var(--background-primary);
        color: var(--text-primary);
    }

    .tool-bar > button {
        background-color: var(--button-color);
        color: var(--text-inverse);
    }

    @media(hover:hover){
        .tool-bar > button:hover {
            border: 2px solid var(--highlight-color);
        }
    }

    .tool-bar > button:focus {
        border: 2px solid var(--highlight-color);
    }

    .add {
        margin-right: auto;
    }

    @keyframes pulse {
        0% {
            -webkit-text-stroke: 0 rgba(204, 204, 0, 0);
        }

        15% {
            -webkit-text-stroke: 3px rgba(204, 204, 0, 1);
        }

        30% {
            -webkit-text-stroke: 0 rgba(204, 204, 0, 0);
        }
    }

    .update {
        margin-right: 10px;
    }

    .update.animate {
        animation-name: pulse;
        animation-duration: 5s;
        animation-iteration-count: infinite;
    }

    .about {
        font-size: 20px;
    }

    .update-message {
        display: flex;
        align-items: center;

        padding: 12px;

        background-color: var(--background-primary);
        color: var(--text-primary);

        box-shadow: 0 -1px 3px rgba(0,0,0,0.12), 0 -1px 2px rgba(0,0,0,0.24);
    }

    .update-message > button {
        width: auto;
        height: 24px;
        font-size: 16px;
    }

    @media(hover: hover){
        .update-message > button:hover {
            outline: 2px solid var(--button-color);
        }
    }

    .update-message > button:focus {
        outline: 2px solid var(--button-color);
    }

    .reload {
        margin-left: auto;
    }

    .later {
        margin-left: 16px;
    }
</style>