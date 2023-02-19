import UrlModel from '@/resources/url/url.model';
import Url from '@/resources/url/url.interface';
class UrlService {
    private url = UrlModel;

    /**
     * Create a new url
     */
    public async create(originalUrl: string): Promise<Url> {
        try {
            const urlId = Math.random().toString(36).substr(2, 9);
            const url = await this.url.create({ originalUrl, urlId });
            return {
                originalUrl: url.originalUrl,
                urlId: url.urlId,
            } as Url;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    /**
     * Get a url by urlId
     */
    public async get(urlId: string): Promise<Url> {
        try {
            const url = await this.url.findOne({ urlId }).select('-_id -__v');
            if (url == null) {
                throw new Error('Url Not Found');
            }
            return url;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default UrlService;
