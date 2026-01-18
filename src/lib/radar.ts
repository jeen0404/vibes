export interface RadarBlip {
    id: string;
    lat: number;
    lng: number;
    user: {
        username: string;
        avatarUrl: string;
    };
    message: string;
    distance: number; // in meters
    timestamp: string;
}
