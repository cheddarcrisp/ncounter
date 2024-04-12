<div class="history-container">
    <header>
        <h1>{ counter.title }</h1>
        <button class="close" on:click={ close }><span class="material-symbols-outlined">close</span></button>
    </header>
    <div class="table-container">
        <table class="history">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
            {#each history as data}
                <tr>
                    <td>{ data.time }</td>
                    <td>{ data.value }</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
<script>
import { createEventDispatcher } from 'svelte';
import { counters } from './db.js';

const dispatch = createEventDispatcher();

const formatter = new Intl.DateTimeFormat('en-US',
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

$: counter = $counters.find(x => x.id == counterId);
$: history = counter.history.map(x => {
    return {
        time: formatter.format(x.time),
        value: x.value
    }
});

export let counterId;

function close(){
    dispatch('close');
}
</script>
<style>
    .history-container{
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
    }

    header {
        display: flex;
        flex: none;
    }

    header h1 {
        font-size: 22px;
        font-weight: 600;
        margin: 5px;
    }

    .table-container {
        position: relative;

        overflow: auto;
    }

    .close {
        margin-left: auto;
    }

    .history {
        width: 100%;
    }

    .history th {
        font-weight: 600;
        position: sticky;
        background-color: var(--background-alternate);
        top: 0;
        text-align: left;
    }

    .history tbody tr:nth-child(odd){
        background-color: rgba(255, 255, 255, 0.1);
    }

    .history tbody tr:nth-child(even){
        background-color: rgba(0, 0, 0, 0.1);
    }

    .history td, .history th {
        padding: 5px;
    }
</style>