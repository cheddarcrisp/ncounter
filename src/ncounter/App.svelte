<div class="app">
{#each counters as counter}
<Counter counter={ counter } on:save={() => { save(counter); } }></Counter>
{/each}
</div>
<button class="add" on:click="{ showAdd }"><i class="material-icons">add</i></button>
{#if showAddDialog}
<div class="dialog">
    <div class="dialog-content">
        <label>Name: <input type="text" bind:value={newCounter.title} use:focus/></label>
        <label>Initial Value: <input type="number" bind:value={newCounter.value} /></label>
        <label>Target: <input type="number" bind:value={newCounter.max} /></label>
        <label>Click counter: <input type="checkbox" bind:value={newCounter.isClickCounter} /></label>
        <button on:click={ () => { showAddDialog = false; } }>Cancel</button>
        <button class="ok" on:click={ addCounter }>OK</button>
    </div>
</div>
{/if}
<script>
import Counter from './Counter.svelte';

let showAddDialog = false;

let newCounter = null;

let counters = [
    {
        title: 'Test 1',
        value: 0
    },
    {
        title: 'Test 2',
        value: 10
    },
    {
        title: 'Max Test',
        value: 0,
        max: 100
    },
    {
        title: 'Click Test',
        value: 0,
        isClickCounter: true
    }
];

function focus(node){
    node.focus();
}

function save(counter){
    alert('Save ' + counter.title);
}

function showAdd(){
    newCounter = {
        title: '',
        value: 0,
        isClickCounter: false
    }

    console.log({ newCounter });

    showAddDialog = true;
}

function addCounter(){
    counters = [...counters, newCounter];

    showAddDialog = false;
}
</script>
<style>
    .add {
        position: fixed;
        bottom: 15px;
        right: 15px;

        background-color: #90C090;
        border-radius: 50%;

        width: 40px;
        height: 40px;
        color: white;
    }

    .dialog-content > label {
        display: flex;
        width: 100%;
        margin-bottom: 5px;
    }

    .dialog-content > label > input {
        margin-left: auto;
    }

    .ok {
        margin-left: auto;
    }

    .dialog-content button {
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
    }

    .app {
        margin-bottom: 60px;
    }
</style>