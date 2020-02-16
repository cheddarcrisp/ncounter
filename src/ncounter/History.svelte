<div class="history-container">
    <header>
        <h1>{ counter.title }</h1>
        <button class="close" on:click={ close }><i class="material-icons">close</i></button>
    </header>
    <canvas class="chart-container" bind:this={ chartEl } width="{ window.outerWidth }" height="250">
    </canvas>
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
import Chart from 'chart.js';

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
$: dataset = counter.history.reduce((acc, x) => {
    return {
        labels: [...acc.labels, x.time],
        datasets: [
            {
                data: [...acc.datasets[0].data, x.value]
            }
        ]
    }
}, {
    labels: [],
    datasets: [
        {
            data: []
        }
    ]
});

export let counterId;

let chartEl;

$: {
    if(chartEl){
        new Chart(chartEl, {
            type: 'line',
            data: dataset,
            options: {
                scales: {
                    xAxes: [
                        {
                            type: 'time'
                        }
                    ]
                },
                legend: {
                    display: false
                }
            }
        });
    }
}

function close(){
    dispatch('close');
}
</script>
<style>
    .history-container{
        background-color: white;
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
        background-color: #CDCDCD;
        top: 0;
        text-align: left;
    }

    .history tr:nth-child(even){
        background-color: #F0F0F0;
    }

    .history td, .history th {
        padding: 5px;
    }
</style>