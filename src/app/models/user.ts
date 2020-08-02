export interface User {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean,
    profile: {
        max_device_nb: Number,
        role: string,
        tournament: string,
        team: string
    }
}