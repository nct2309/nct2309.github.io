
export interface User{
    id: number,
    username: string,
    password: string,
    role: string,
    lastName: string,
    firstName: string,
    is_available: number
}


export interface Worker {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    position:  number,
    avatar: string,
    status: number,
    memberSince: string,
}

export interface Vehicle {
    id: string,
    location: string,
    usebyID: string,
    status: number,
}

export interface MCP {
    id: string,
    location: [number, number],
    capacity: number,
    used: number,
    is_full: boolean,
}