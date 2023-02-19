import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UrlController from '@/resources/url/url.controller';
import UserController from '@/resources/user/user.controller';

validateEnv();

const app = new App(
    [new UrlController(), new UserController()],
    Number(process.env.PORT)
);

app.listen();
