import { Schema, model } from 'mongoose';
import Url from '@/resources/url/url.interface';

const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    urlId: {
        type: String,
        required: true,
        unique: true,
    },
});

export default model<Url>('Url', UrlSchema);
