<div class="counter" on:click="{ clickCount }">
    <header>{ counter.title }</header>
    <span class="value">{ counter.value }</span>
    {#if counter.max}
    <MyProgress value={ counter.value } max={ counter.max }></MyProgress>
    {/if}
    <div class="controls">
        {#if !counter.isClickCounter}
        <button on:click={ () => { showIncrement = true; } }><i class="material-icons">add</i></button>
        {/if}
        <span class="message">{ message }</span>
        <button class="reset" on:click={ reset }><i class="material-icons">undo</i></button>
        <button on:click={ save }><i class="material-icons">save</i></button>
        <button on:click={ remove }><i class="material-icons">delete</i></button>
    </div>
    {#if showIncrement}
    <div class="dialog">
        <div class="dialog-content">
            <input class="increment-value" type="number" bind:value={ incrementValue } use:focus />
            <button on:click={ () => { showIncrement = false; } }>Cancel</button>
            <button class="ok" on:click={ increment }>OK</button>
        </div>
    </div>
    {/if}        
</div>
<script>
import MyProgress from './MyProgress.svelte';
import { tick } from 'svelte';
import { createEventDispatcher } from 'svelte';
import { counters } from './db.js';

const dispatch = createEventDispatcher();

export let counterId;

$: counter = $counters.find(x => x.id == counterId);

let incrementValue;
let showIncrement;
let message = '';

const formatter = new Intl.DateTimeFormat('en-US',
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

function focus(node){
    node.focus();
}

function update(newCounter){
    counters.update(newCounter);
}

function increment(){
    const newCounter = {
        ...counter,
        value: counter.value + incrementValue
    }

    update(newCounter);
    
    showIncrement = false;
    incrementValue = null;
}

function reset(e){
    e.stopPropagation();

    if(confirm(`Reset ${counter.title}?`)){
        const newCounter = {
            ...counter,
            value: 0
        }

        update(newCounter);
    }
}

function save(e) {
    e.stopPropagation();

    const time = new Date();

    const data = {
        time,
        value: counter.value
    }

    const newCounter = {
        ...counter,
        history: [...counter.history, data]
    }

    message = `Saved ${data.value} at ${formatter.format(data.time)}`;
    setTimeout(() => message = '', 5000);

    update(newCounter);
}

function remove(){
    if(confirm(`Remove ${counter.title}?`))
        counters.remove(counter);
}

function clickCount() {
    if(!counter.isClickCounter)
        return;

    const newCounter = {
        ...counter,
        value: counter.value + 1
    }

    update(newCounter);
}
</script>
<style>
.counter{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin-bottom: 12px;

    display: flex;
    flex-direction: column;

    padding: 5px;
}

.controls {
    display: flex;
}

.message {
    flex: 1;
    text-align: center;
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

.increment-value {
    width: 100%;
    margin: 5px 0;
}

.ok {
    margin-left: auto;
}

.dialog-content button {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
}
</style>