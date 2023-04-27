import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { userData } from "../../data/data";
import { User } from "../../api/types";

interface SelectProps {
    role: string;
    worker: User | null;
    setWorker: React.Dispatch<React.SetStateAction<User | null>>;
}

const WorkerList = (selectProps: SelectProps) => {
    
    const [workerSelect, setWorkerSelect] = useState("");
    
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
                    setWorkerSelect(e.target.value);
                    localStorage.removeItem('worker');
                    selectProps.setWorker(workers.find(((worker: User) => worker.id === Number(e.target.value))) as User);
                    if (workerSelect !== "") {
                        localStorage.setItem('worker', JSON.stringify(selectProps.worker));
                    }
                }}
                >
                <option value="">Choose...</option>
                {workers.map((worker: User) => (
                    <option key={worker.id} value={worker.id}>
                    {worker.lastName + " " + worker.firstName}
                    </option>
                ))}
            </Form.Control>
            { selectProps.worker ?
            <Form.Text id="workeroverview">
                <strong>Username: </strong> {selectProps.worker.username} <br/>
                <strong>ID: </strong> {selectProps.worker.id} <br/>
                <strong>Status: </strong> {selectProps.worker.is_available === true ? "OK" : "Busy"} <br/>
            </Form.Text>
            : ""}
        </Form.Group>
    );
}
export default WorkerList;