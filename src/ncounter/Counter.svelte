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
        <button class="reset" on:click={ reset }><i class="material-icons">undo</i></button>
        <button on:click={ save }><i class="material-icons">save</i></button>
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

const dispatch = createEventDispatcher();

export let counter;

let incrementValue;
let showIncrement;

function focus(node){
    node.focus();
}

function increment(){
    counter.value += incrementValue;
    showIncrement = false;
    incrementValue = null;
}

function reset(e){
    e.stopPropagation();

    if(confirm(`Reset ${counter.title}?`))
        counter.value = 0;
}

function save(e) {
    e.stopPropagation();

    dispatch('save');
    counter.value = 0;
}

function clickCount() {
    if(!counter.isClickCounter)
        return;

    counter.value++;
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

.reset {
    margin-left: auto;
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