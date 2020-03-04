<div class="app">
    <div class="counter-list">
        {#each $counters as counter}
        <Counter counterId={ counter.id }></Counter>
        {/each}
    </div>
    <div class="tool-bar">
        <button class="add" on:click="{ showAdd }"><i class="material-icons">add</i></button>
        <button class="about" on:click="{ () => { showAbout = true; } }">?</button>
    </div>
</div>
{#if showAddDialog}
<div class="dialog">
    <div class="dialog-content">
        <label>Name<input type="text" bind:value={newCounter.title} use:focus/></label>
        <label>Initial Value<input type="number" bind:value={newCounter.initialValue} /></label>
        <label>Target<input type="number" bind:value={newCounter.max} /></label>
        <label>Save history<input type="checkbox" bind:checked={newCounter.saveHistory} /></label>
        <button on:click={ () => { showAddDialog = false; } }>Cancel</button>
        <button class="ok" on:click={ add }>OK</button>
    </div>
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

function focus(node){
    node.focus();
}

function showAdd(){
    newCounter = {
        title: '',
        initialValue: 0,
        saveHistory: false,
        history: []
    }

    showAddDialog = true;
}

function add(){
    const counter = {
        ...newCounter,
        value: newCounter.initialValue
    }

    counters.add(counter);

    showAddDialog = false;
}
</script>
<style lang="scss">
    .ok {
        margin-left: auto;
    }

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

    .tool-bar > button:focus, .tool-bar > button:hover {
        border: 2px solid var(--highlight-color);
    }

    .about {
        margin-left: auto;
        font-size: 20px;
    }
</style>