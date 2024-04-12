import { set as setDb, get as getDb } from 'idb-keyval';
import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

function createCounters(){
    const {subscribe,set,update:updateVal} = writable([]);

    getDb('counters').then(counters => {
        if(counters) {
            const updatedCounters = counters.map(counter => {
                return { 
                    initialValue: 0,
                    showHistory: false,
                    ...counter
                }
            });

            set(updatedCounters);
        }
    });

    function updateHistory(counter){
        if(counter.saveHistory){
            const time = new Date();

            const data = {
                time,
                value: counter.value
            };
            
            counter.history = [...counter.history, data];
        }
    }

    function add(counter){
        const newCounter = { id: uuid(), ...counter };

        updateHistory(newCounter);

        updateVal(counters => {
            const newCounters = [...counters, newCounter];

            setDb('counters', newCounters);

            return newCounters;
        });
    }

    function update(counter){
        updateHistory(counter);
        
        updateVal(counters => {
            const counterIndex = counters.findIndex(x => x.id == counter.id);

            const newCounters = [...counters.slice(0, counterIndex), counter, ...counters.slice(counterIndex + 1)];

            setDb('counters', newCounters);

            return newCounters;
        });
    }

    function remove(counter){
        updateVal(counters => {
            const counterIndex = counters.findIndex(x => x.id == counter.id);

            const newCounters = [...counters.slice(0, counterIndex), ...counters.slice(counterIndex + 1)];

            setDb('counters', newCounters);

            return newCounters;
        })
    }

    return {
        subscribe,
        add,
        update,
        remove
    };
}

export const counters = createCounters();