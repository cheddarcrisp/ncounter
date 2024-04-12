<div class="counter">
    <header>{ counter.title }</header>
    <span class="value">{ counter.value }</span>
    {#if counter.max !== null}
    <MyProgress value={ counter.value } max={ counter.max }></MyProgress>
    {/if}
    <div class="controls">
        <button on:click={ () => { showIncrement = true; } }><span class="material-symbols-outlined">add</span></button>
        <button on:click={ () => { showSet = true; } }><span class="material-symbols-outlined">edit</span></button>
        <button class="reset" on:click={ reset }><span class="material-symbols-outlined">replay</span></button>
        {#if counter.saveHistory}
        <button class="history" on:click={ () => { showHistory = true; } }><span class="material-symbols-outlined">show_chart</span></button>
        {/if}
        <button on:click={ startEdit }><span class="material-symbols-outlined">settings</span></button>
        <button on:click={ remove }><span class="material-symbols-outlined">delete</span></button>
    </div>
    {#if showValueDialog}
    <div class="dialog">
        <form class="dialog-content" novalidate bind:this={ dialogForm }>
            <h1>{ showIncrement ? "Add" : "Set" }</h1>
            <input class="dialog-value" type="text" required pattern="(0|([1-9]\d*))(\.\d+)?" inputmode="decimal" bind:value={ dialogValue } use:focus />
            <div class="buttons">
                <button class="ok" on:click|preventDefault|stopPropagation={ dialogDone }>OK</button>
                <button on:click|preventDefault|stopPropagation={ dialogCancel }>Cancel</button>
            </div>
        </form>
    </div>
    {/if}
    {#if showEditDialog}
    <div class="dialog">
        <form class="dialog-content" novalidate bind:this={ dialogForm }>
            <label>Name<input type="text" required bind:value={editingCounter.title} use:focus/></label>
            <label>Initial Value<input type="text" required pattern="(0|([1-9]\d*))(\.\d+)?" inputmode="decimal" bind:value={editingCounter.initialValue} /></label>
            <label>Target<input type="text" pattern="(0|([1-9]\d*))(\.\d+)?" inputmode="decimal" bind:value={editingCounter.max} /></label>
            <label>Save history<input type="checkbox" bind:checked={editingCounter.saveHistory} /></label>
            <div class="buttons">
                <button class="ok" on:click|preventDefault={ finishEdit }>OK</button>
                <button on:click|preventDefault={ () => { showEditDialog = false; } }>Cancel</button>
            </div>
        </form>
    </div>
    {/if}
</div>
<script>
import MyProgress from './MyProgress.svelte';
import { counters } from './db.js';

export let counterId;

$: counter = $counters.find(x => x.id == counterId);

let dialogValue = null;
let showIncrement;
let showSet;
let showEditDialog;
let editingCounter;
let showHistory;
let dialogForm;

$: showValueDialog = showIncrement || showSet;

function focus(node){
    node.focus();
}

function update(newCounter){
    counters.update(newCounter);
}

function startEdit(e){
    editingCounter = { ...counter };
    showEditDialog = true;
}

function finishEdit(){
    if(!dialogForm.checkValidity()) {
        dialogForm.removeAttribute('novalidate');
        return;
    }

    const updatedCounter = {
        ...editingCounter,
        max: editingCounter.max !== null && editingCounter.max !== '' ? +editingCounter.max : null,
        value: +editingCounter.value
    }

    update(updatedCounter);
    showEditDialog = false;
}

function dialogCancel(){
    showIncrement = false;
    showSet = false;
}

function dialogDone(){
    if(!dialogForm.checkValidity()) {
        dialogForm.removeAttribute('novalidate');
        return;
    }

    const newCounter = showIncrement ? {
        ...counter,
        value: +counter.value + +dialogValue
    } : {
        ...counter,
        value: +dialogValue
    }

    update(newCounter);
    
    showIncrement = false;
    showSet = false;
    dialogValue = null;
}

function reset(e){
    if(confirm(`Reset ${counter.title}?`)){
        const newCounter = {
            ...counter,
            value: +counter.initialValue
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
</style>