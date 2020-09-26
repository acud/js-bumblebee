import { Address } from '../swarm/address'

export interface Tags {
    getTag(uint: number): Tag
    create(): Tag
}

export class Tag {
    public Total: number // total chunks belonging to a tag
    public Split: number // number of chunks already processed by splitter for hashing
    public Seen: number // number of chunks already seen
    public Stored: number // number of chunks already stored locally
    public Sent: number // number of chunks sent for push syncing
    public Synced: number // number of chunks synced with proof

    public readonly Uid: number        // a unique identifier for this tag
    public readonly Name: string        // a name tag for this tag
    public readonly Address: Address // the associated swarm hash for this tag
    public readonly StartedAt: number     // tag started to calculate ETA
    /**
     *
     */
    constructor() {
        this.StartedAt = Date.now()
    }

    increment(state: State): void {
        switch (state) {
            case State.StateSeen:
                this.Seen++
                break;
            case State.StateSent:
                this.Sent++
                break;
            case State.StateSplit:
                this.Split++
                break;
            case State.StateStored:
                this.Stored++
                break;
            case State.StateSynced:
                this.Synced++
                break;

            default:
                break;
        }
    }
}

enum State {
    TotalChunks = 1, // The total no of chunks for the tag
    StateSplit = 2,      // chunk has been processed by filehasher/swarm safe call
    StateStored = 3,     // chunk stored locally
    StateSeen = 4, // chunk previously seen
    StateSent = 5, // chunk sent to neighbourhood
    StateSynced = 6
}

export class HttpTagClient {

}