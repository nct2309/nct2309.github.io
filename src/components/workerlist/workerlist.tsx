import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { collectorData, janitorData, userData } from "../../data/data";
import { User } from "../../api/types";

interface SelectProps {
    role: string;
    setWorker: React.Dispatch<React.SetStateAction<User | null>>;
}

const WorkerList = (selectProps: SelectProps) => {
    
    const [workerSelect, setWorkerSelect] = useState("");
    const [worker, setWorker] = useState<User | null>(null);
    
    let workers = userData;
    if (selectProps.role !== "") {
        workers = workers.filter((worker: User) => worker.role === selectProps.role);
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
                    setWorker(workers.find((worker: User) => worker.id === Number(e.target.value)) as User)
                    selectProps.setWorker(worker);
                }}
                >
                <option value="">Choose...</option>
                {workers.map((worker: User) => (
                    <option key={worker.id} value={worker.id}>
                    {worker.lastName + " " + worker.firstName }
                    </option>
                ))}
            </Form.Control>
            <Form.Text id="workeroverview">
                <strong>Username: </strong> { worker ? worker?.username : ""} <br/>
                <strong>ID: </strong> { worker ? worker?.id : "" } <br/>
                <strong>Status: </strong> { worker ? worker?.is_available === 1 ? "OK" : "Busy" : "" } <br/>
            </Form.Text>
        </Form.Group>
    );
}
export default WorkerList;