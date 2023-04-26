import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { collectorData, janitorData } from "../../data/data";
import { Worker } from "../../data/types";

interface SelectProps {
    role: string;
    setWorker: React.Dispatch<React.SetStateAction<Worker | null>>;
}

const WorkerList = (selectProps: SelectProps) => {
    
    const [workerSelect, setWorkerSelect] = useState("");
    const [worker, setWorker] = useState<Worker | null>(null);
    
    let workers = [] as any;
    if (selectProps.role === "collector") {
        workers = collectorData;
    } else if (selectProps.role === "janitor") {
        workers = janitorData;
    } else {
        workers = [];
    }

    return (
        <Form.Group controlId="worker-select">
            <Form.Label>Select Worker</Form.Label>
                <Form.Control
                as="select"
                value={workerSelect}
                onChange={(e) => {
                    setWorkerSelect(e.target.value)
                    setWorker(workers.find((worker: Worker) => worker.id === e.target.value))
                    selectProps.setWorker(worker);
                }}
                >
                <option value="">Choose...</option>
                {workers.map((worker: Worker) => (
                    <option key={worker.id} value={worker.id}>
                    {worker.username}
                    </option>
                ))}
            </Form.Control>
            <Form.Text id="workeroverview">
                <strong>Name: </strong> { worker ? worker?.lastName + " " + worker?.firstName : "" } <br/>
                <strong>ID: </strong> { worker ? worker?.id : "" } <br/>
                <strong>Status: </strong> { worker ? worker?.status === 0 ? "OK" : "Busy" : "" } <br/>
            </Form.Text>
        </Form.Group>
    );
}
export default WorkerList;