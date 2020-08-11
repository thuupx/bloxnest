import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Cookies from 'cookies'
import { createReadStream } from 'fs'
import * as jwt from 'jsonwebtoken'
import { INestApplication, HttpServer } from '@nestjs/common'
import { Express, Request, Response, NextFunction } from 'express'
import * as express from 'express'
const DOC_ENDPOINT = 'api'
const DOC_LOGIN_ENDPOINT = 'doc-login'
const DOC_LOGIN_HTML_PATH = `${process.cwd()}/public/docs-login.html`

const COOKIE_NAME = 'ms::api-front-doc'

export default function setUpSwagger(
  app: INestApplication,
  server: Express
) {
  server.use(express.urlencoded({ extended: true }));
  const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url
    if (
      url !== `/${DOC_LOGIN_ENDPOINT}` &&
      url.indexOf(`/${DOC_ENDPOINT}`) === 0
    ) {
      const keys = [process.env.DOC_LOGIN_KEY as string]
      const cookies = new Cookies(req, res, {
        keys: keys
      })
      const cookie = cookies.get(COOKIE_NAME, { signed: true })
      if (cookie) {
        try {
          jwt.verify(cookie, keys[0])
          next()
          return
        } catch { }
      }
      res.redirect(`/${DOC_LOGIN_ENDPOINT}`)
    }
  }
  server.get(`/${DOC_ENDPOINT}`, checkAuth);
  server.route('/doc-login')
    .get((req, res) => {
      const keys = [process.env.DOC_LOGIN_KEY as string]
      const cookies = new Cookies(req, res, {
        keys: keys
      })
      const cookie = cookies.get(COOKIE_NAME, { signed: true })
      if (cookie) {
        res.redirect(`/${DOC_ENDPOINT}`)
        return;
      }
      res
        .header('Content-Type', 'text/html; charset=UTF-8')
        .sendFile(DOC_LOGIN_HTML_PATH)
    })
    .post((req, res) => {
      const keys = [process.env.DOC_LOGIN_KEY as string]
      const pw = process.env.DOC_LOGIN_PW as string
      const you_know: string = req.body.you_know
      if (you_know !== pw) {
        console.log("Failer");
        res.redirect(`/${DOC_LOGIN_ENDPOINT}`)
        return
      }
      const token = jwt.sign({ id: new Date().getTime() }, keys[0])
      const cookies = new Cookies(req, res, {
        keys: keys
      })
      cookies.set(COOKIE_NAME, token, { signed: true })
      res.redirect(`/${DOC_ENDPOINT}`)
    })
  const options = new DocumentBuilder()
    .setTitle('Bloxnest API')
    .setDescription('This open API for Bloxnest')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', in: 'header', scheme: 'bearer', bearerFormat: 'Bearer ', name: 'Authorization' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(DOC_ENDPOINT, app, document);
}