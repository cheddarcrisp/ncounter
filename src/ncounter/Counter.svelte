<div class="counter">
    <header>{ counter.title }</header>
    <span class="value">{ counter.value }</span>
    {#if counter.max}
    <MyProgress value={ counter.value } max={ counter.max }></MyProgress>
    {/if}
    <div class="controls">
        <button on:click={ () => { showIncrement = true; } }><i class="material-icons">add</i></button>
        <button on:click={ () => { showSet = true; } }><i class="material-icons">edit</i></button>
        <button class="reset" on:click={ reset }><i class="material-icons">replay</i></button>
        {#if counter.saveHistory}
        <button class="history" on:click={ () => { showHistory = true; } }><i class="material-icons">show_chart</i></button>
        {/if}
        <button on:click={ startEdit }><i class="material-icons">settings</i></button>
        <button on:click={ remove }><i class="material-icons">delete</i></button>
    </div>
    {#if showValueDialog}
    <div class="dialog">
        <div class="dialog-content">
            <h1>{ showIncrement ? "Add" : "Set" }</h1>
            <input class="dialog-value" type="text" inputmode="decimal" bind:value={ dialogValue } use:focus />
            <button on:click={ dialogCancel }>Cancel</button>
            <button class="ok" on:click={ dialogDone }>OK</button>
        </div>
    </div>
    {/if}
    {#if showEditDialog}
    <div class="dialog">
        <div class="dialog-content">
            <label>Name<input type="text" bind:value={editingCounter.title} use:focus/></label>
            <label>Initial Value<input type="text" inputmode="decimal" bind:value={editingCounter.initialValue} /></label>
            <label>Target<input type="text" inputmode="decimal" bind:value={editingCounter.max} /></label>
            <label>Save history<input type="checkbox" bind:checked={editingCounter.saveHistory} /></label>
            <button on:click={ () => { showEditDialog = false; } }>Cancel</button>
            <button class="ok" on:click={ finishEdit }>OK</button>
        </div>
    </div>
    {/if}
    {#if showHistory}
    <History { counterId } on:close={ () => { showHistory = false; } }></History>
    {/if}
</div>
<script>
import MyProgress from './MyProgress.svelte';
import History from './History.svelte';
import { tick } from 'svelte';
import { counters } from './db.js';

export let counterId;

$: counter = $counters.find(x => x.id == counterId);

let dialogValue = null;
let showIncrement;
let showSet;
let showEditDialog;
let editingCounter;
let showHistory;

$: showValueDialog = showIncrement || showSet;

function focus(node){
    node.focus();
}

function update(newCounter){
    counters.update(newCounter);
}

function startEdit(e){
    e.stopPropagation();

    editingCounter = {...counter};
    showEditDialog = true;
}

function finishEdit(){
    update(editingCounter);
    showEditDialog = false;
}

function dialogCancel(){
    showIncrement = false;
    showSet = false;
}

function dialogDone(){
    const newCounter = showIncrement ? {
        ...counter,
        value: counter.value + dialogValue
    } : {
        ...counter,
        value: dialogValue
    }

    update(newCounter);
    
    showIncrement = false;
    showSet = false;
    dialogValue = null;
}

function reset(e){
    e.stopPropagation();

    if(confirm(`Reset ${counter.title}?`)){
        const newCounter = {
            ...counter,
            value: counter.initialValue
        }

        update(newCounter);
    }
}

function remove(){
    if(confirm(`Remove ${counter.title}?`))
        counters.remove(counter);
}

</script>
<style>
.counter{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    background-color: var(--background-primary);
    color: var(--text-primary);

    margin-bottom: 4px;

    display: flex;
    flex-direction: column;

    padding: 5px;
}

.controls {
    display: flex;
}

header {
    font-size: 22px;
    font-weight: 600;
    margin: 0 0 5px 0;
}

.value {
    font-size: 18px;
    font-weight: 500;
    margin-left: 0;
}

.reset {
    margin-left: 12px;
}

.reset + button {
    margin-left: auto;
}

.history {
    margin-right: 12px;
}

.dialog-value {
    width: 100%;
    margin: 5px 0;
}

.ok {
    margin-left: auto;
}
</style>