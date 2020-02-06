import { set as setDb, get as getDb } from 'idb-keyval';
import { writable } from 'svelte/store';
import uuid from 'uuid/v4';

function createCounters(){
    const {subscribe,set,update:updateVal} = writable([]);

    getDb('counters').then(counters => {
        if(counters)
            set(counters);
    });

    function add(counter){
        const newCounter = { id: uuid(), ...counter };

        updateVal(counters => {
            const newCounters = [...counters, newCounter];

            setDb('counters', newCounters);

            return newCounters;
        });
    }

    function update(counter){
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