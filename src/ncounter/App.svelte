<div class="app">
{#each $counters as counter}
<Counter counterId={ counter.id }></Counter>
{/each}
<button class="add" on:click="{ showAdd }"><i class="material-icons">add</i></button>
</div>
{#if showAddDialog}
<div class="dialog">
    <div class="dialog-content">
        <label>Name: <input type="text" bind:value={newCounter.title} use:focus/></label>
        <label>Initial Value: <input type="number" bind:value={newCounter.initialValue} /></label>
        <label>Target: <input type="number" bind:value={newCounter.max} /></label>
        <label>Save history: <input type="checkbox" bind:checked={newCounter.saveHistory} /></label>
        <button on:click={ () => { showAddDialog = false; } }>Cancel</button>
        <button class="ok" on:click={ add }>OK</button>
    </div>
</div>
{/if}
<script>
import Counter from './Counter.svelte';
import { counters } from './db.js';

let showAddDialog = false;

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
<style>
    .add {
        display: flex;
        align-items: center;
        justify-content: center;

        position: fixed;
        bottom: 15px;
        right: 15px;

        z-index: 2;

        background-color: #90C090;
        border-radius: 50%;

        width: 40px;
        height: 40px;
        color: white;
    }

    .ok {
        margin-left: auto;
    }

    .app {
        padding: 5px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        z-index: 1;

        overflow: auto;
    }
</style>