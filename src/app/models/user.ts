export interface User {
    id: Number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_active: boolean,
    profile: {
        max_device_nb: Number,
        role: string,
        tournament: string,
        team: string
    }
}