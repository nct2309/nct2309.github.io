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
    
    

    // return (
        
    // );
}
export default WorkerList;