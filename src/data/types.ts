
export interface User{
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    birthDate: string,
    avatar: string,
    memberSince: string,
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