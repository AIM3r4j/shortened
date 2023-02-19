import { Document } from 'mongoose';

export default interface Url extends Document {
    originalUrl: string;
    urlId: string;
}
