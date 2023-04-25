import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { collectorData, janitorData } from "../../data/data";

interface SelectOption {
    value: string;
    label: string;
}

const workers: SelectOption[] = [
    { value: 'worker1', label: 'Worker 1' },
    { value: 'worker2', label: 'Worker 2' },
];

const WorkerList = () => {
    const [worker, setWorker] = useState('');
    return (
        <Form.Group controlId="worker-select">
            <Form.Label>Select Worker</Form.Label>
                <Form.Control
                as="select"
                value={worker}
                onChange={(e) => setWorker(e.target.value)}
                >
                <option value="">Choose...</option>
                {workers.map((worker) => (
                    <option key={worker.value} value={worker.value}>
                    {worker.label}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}
export default WorkerList;