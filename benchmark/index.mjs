/* eslint-disable no-console,func-style */

import ClosureBenchmark from "./closure-benchmark.mjs";
import FastPriorityQueueBenchmark from "./fast-priority-queue-benchmark.mjs";
import FlatQueueBenchmark from "./flat-queue-benchmark.mjs";
import HeapifyBenchmark from "./heapify-benchmark.mjs";
import TinyQueueBenchmark from "./tiny-queue-benchmark.mjs";

const NUMBER_OF_KEYS = 1000000;
const BATCH_SIZE = 1000;
const BENCH_RUN_COUNT = 5;

const keys = [];
const priorities = [];
const dataObjs = [];
for (let i = 0; i < NUMBER_OF_KEYS; i++) {
    const value = Math.floor(100 * Math.random());
    priorities.push(value);
    keys.push(i + 1);
    dataObjs.push({value});
}

/**
 * @param {Benchmark[]} benchs
 */
function consolidate(benchs) {
    const benchTimes = benchs.map(bench => bench.getTimes());
    const tags = Array.from(benchTimes[0].keys());
    const names = benchs.
        map(bench => bench.name).
        map(name => name.padStart(10)).
        join(" ");
    console.info(`${" ".repeat(25)} ${names}`);
    for (const tag of tags) {
        const times = benchTimes.map(timesByTag => timesByTag.get(tag));
        const values = times.map(time => (time < 1 ? "-" : time.toString()).padStart(10)).join(" ");
        console.info(`${tag.padEnd(25)} ${values}`);
    }
}

const heapifyNoKeyUpdates = { keys, priorities, capacity: NUMBER_OF_KEYS, wantsKeyUpdates: false };
const heapifyWithKeyUpdates = { keys, priorities, capacity: NUMBER_OF_KEYS, wantsKeyUpdates: true };

const benchs = [
    new ClosureBenchmark(keys, priorities, NUMBER_OF_KEYS, BATCH_SIZE),
    new FastPriorityQueueBenchmark(keys, priorities, NUMBER_OF_KEYS, BATCH_SIZE),
    new FlatQueueBenchmark(keys, priorities, NUMBER_OF_KEYS, BATCH_SIZE),
    new TinyQueueBenchmark(keys, dataObjs, NUMBER_OF_KEYS, BATCH_SIZE),
    new HeapifyBenchmark(heapifyNoKeyUpdates, keys, priorities, NUMBER_OF_KEYS, BATCH_SIZE),
    new HeapifyBenchmark(heapifyWithKeyUpdates, keys, priorities, NUMBER_OF_KEYS, BATCH_SIZE),
];

for (const bench of benchs) {
    bench.run(BENCH_RUN_COUNT);
    console.info(`${bench.name} done (${BENCH_RUN_COUNT} runs)`);
}

consolidate(benchs);
